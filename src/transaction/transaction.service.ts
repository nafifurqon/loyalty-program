import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTransactionRequestDto } from './dto/transaction.dto';
import { DataSource } from 'typeorm';
import { Runner, runInTransaction } from '../utils/typeorm/run.in.transaction';
import { lockmode } from '../utils/typeorm/runner.lock.mode';
import { MemberRepository } from '../member/member.repository';
import { ProductRepository } from '../product/product.repository';
import { LoyaltyProgramRepository } from '../loyalty-program/repositories/loyalty-program.repository';
import * as moment from 'moment';
import { TransactionRepository } from './repositories/transaction.repository';
import { LoyaltyProgramType } from '../utils/enum.util';
import { Product } from '../entities/product.entity';
import { TransactionItemRepository } from './repositories/transaction-item.repository';
import { CreateNewTransactionItemPayloadDto } from './dto/transaction-item.dto';
import { PointHistoryRepository } from '../point-history/point-history.repository';
import { TierModel } from '../tier/tier.repository';

@Injectable()
export class TransactionService {
  constructor(
    /** thitdparties */
    private readonly dataSource: DataSource,

    /** repositories */
    @Inject(MemberRepository)
    private readonly memberRepository: MemberRepository,
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
    @Inject(LoyaltyProgramRepository)
    private readonly loyaltyProgramRepository: LoyaltyProgramRepository,
    @Inject(TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
    @Inject(TransactionItemRepository)
    private readonly transactionItemRepository: TransactionItemRepository,
    @Inject(PointHistoryRepository)
    private readonly pointHistoryRepository: PointHistoryRepository,
    @Inject(TierModel)
    private readonly tierRepository: TierModel,
  ) {}

  async _generateNewCode(runner: Runner): Promise<string> {
    try {
      const latestOrder = await this.transactionRepository.findLatestByDate(
        moment().format('YYYY-MM-DD'),
        runner,
      );
      let newCode = `TRINV/${moment().format('YYMMDD')}/1`;
      if (latestOrder) {
        const splittedCode = latestOrder.code.split('/');
        let lastCounter = Number(splittedCode[splittedCode.length - 1]);
        lastCounter += 1;
        newCode = `TRINV/${moment().format('YYMMDD')}/${lastCounter}`;
      }
      return newCode;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async _generateNewMemberTier(
    updatedPoint: number,
    runner: Runner,
  ): Promise<string> {
    try {
      const tier = await this.tierRepository.findOneByPoint(
        updatedPoint,
        runner,
      );
      if (!tier) throw new BadRequestException('Tier is not found');
      return tier.id;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(payload: CreateTransactionRequestDto): Promise<boolean> {
    try {
      return await runInTransaction(this.dataSource, async (em) => {
        const runner: Runner = {
          manager: em,
          lock_mode: lockmode.pessimistic_write,
        };

        const productIds = payload.items.map((item) => item.product_id);

        const [member, products] = await Promise.all([
          this.memberRepository.findById(payload.member_id, runner),
          this.productRepository.findByIds(productIds, runner),
        ]);

        if (!member) throw new BadRequestException('Member is not found');
        if (products.length !== payload.items.length)
          throw new BadRequestException('Product is not found');

        const mapProductByProductId = new Map<string, Product>();
        for (const product of products) {
          mapProductByProductId.set(product.id, product);
        }

        let totalAmountPrimary = 0;
        let totalQuantity = 0;
        for (const item of payload.items) {
          totalQuantity += Number(item.quantity);
          const subtotal =
            item.quantity * mapProductByProductId.get(item.product_id).price;
          totalAmountPrimary += subtotal;
        }

        const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        const [loyaltyProgram, isExistsTransaction] = await Promise.all([
          this.loyaltyProgramRepository.findByDateAndTier(
            createdAt,
            member.tier_id,
            runner,
          ),
          this.transactionRepository.checkExistsByMemberId(
            payload.member_id,
            runner,
          ),
        ]);

        let earnedPoint = 0;
        if (
          loyaltyProgram &&
          loyaltyProgram.type === LoyaltyProgramType.Transactional
        ) {
          let isValid = true;
          if (loyaltyProgram.is_transactional_combine) {
            if (
              totalAmountPrimary < loyaltyProgram.transaction_amount ||
              totalQuantity < loyaltyProgram.quantity ||
              (loyaltyProgram.is_first_purchase && isExistsTransaction)
            ) {
              isValid = false;
            }
          } else {
            if (
              totalAmountPrimary < loyaltyProgram.transaction_amount &&
              totalQuantity < loyaltyProgram.quantity &&
              loyaltyProgram.is_first_purchase &&
              isExistsTransaction
            ) {
              isValid = false;
            }
          }

          if (isValid) {
            if (loyaltyProgram.percentage_benefit > 0) {
              earnedPoint =
                (totalAmountPrimary *
                  Number(loyaltyProgram.percentage_benefit)) /
                100;
            } else if (loyaltyProgram.fixed_point_benefit > 0) {
              const fixedPoint = Number(loyaltyProgram.fixed_point_benefit);
              earnedPoint =
                Math.round(totalAmountPrimary / fixedPoint) * fixedPoint;
            }
          }
        }

        const redeemedPoint = Number(payload.redeemed_point);
        const totalAmount = totalAmountPrimary - redeemedPoint;
        const transactionCode = await this._generateNewCode(runner);

        const transactionId = await this.transactionRepository.create(
          {
            code: transactionCode,
            member_id: payload.member_id,
            total_amount_primary: totalAmountPrimary,
            total_amount: totalAmount,
            redeemed_point: payload.redeemed_point,
          },
          runner,
        );

        const payloadTransactionItem: CreateNewTransactionItemPayloadDto[] = [];
        for (const item of payload.items) {
          const subtotal =
            item.quantity * mapProductByProductId.get(item.product_id).price;

          payloadTransactionItem.push({
            transaction_id: transactionId,
            product_id: item.product_id,
            quantity: item.quantity,
            price: mapProductByProductId.get(item.product_id).price,
            name: mapProductByProductId.get(item.product_id).name,
            subtotal,
          });
        }
        await this.transactionItemRepository.bulkCreate(
          payloadTransactionItem,
          runner,
        );

        const existingBalancePoint = Number(member.remained_point);
        const updatedBalancePoint =
          existingBalancePoint + earnedPoint - redeemedPoint;
        await this.pointHistoryRepository.create(
          {
            existing_point: existingBalancePoint,
            earned_point: earnedPoint,
            balance_point: updatedBalancePoint,
            member_id: payload.member_id,
            redeemed_point: redeemedPoint,
            transaction_id: transactionId,
            loyalty_program_id: loyaltyProgram ? loyaltyProgram.id : undefined,
          },
          runner,
        );

        const newTierId = await this._generateNewMemberTier(
          updatedBalancePoint,
          runner,
        );
        await this.memberRepository.update(
          {
            balance_point: updatedBalancePoint,
            tier_id: newTierId,
          },
          payload.member_id,
          runner,
        );

        return true;
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
