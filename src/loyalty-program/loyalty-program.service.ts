import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  CreateLoyaltyProgramRequestDto,
  FindAllQueryDto,
  FindAllResponse,
} from './dto/loyalty-program.dto';
import { LoyaltyProgram } from '../entities/loyalty-program.entity';
import { LoyaltyProgramRepository } from './repositories/loyalty-program.repository';
import { TierModel } from '../tier/tier.repository';
import { Runner, runInTransaction } from '../utils/typeorm/run.in.transaction';
import { lockmode } from '../utils/typeorm/runner.lock.mode';
import { LoyaltyProgramTierRepository } from './repositories/loyalty-program-tier.repository';
import { FindAllResponseDto } from '../utils/dto.util';

@Injectable()
export class LoyaltyProgramService {
  constructor(
    /** repositories */
    @Inject(LoyaltyProgramRepository)
    private readonly loyaltyProgramRepository: LoyaltyProgramRepository,
    @Inject(TierModel)
    private readonly tierRepository: TierModel,
    @Inject(LoyaltyProgramTierRepository)
    private readonly loyaltyProgramTierRepository: LoyaltyProgramTierRepository,

    /** thitdparties */
    private readonly dataSource: DataSource,
  ) {}

  async create(
    payload: CreateLoyaltyProgramRequestDto,
  ): Promise<LoyaltyProgram> {
    try {
      return await runInTransaction(this.dataSource, async (em) => {
        const runner: Runner = {
          manager: em,
          lock_mode: lockmode.pessimistic_write,
        };

        const tiers = await this.tierRepository.findByIds(
          payload.tier_ids,
          runner,
        );
        if (tiers.length !== payload.tier_ids.length)
          throw new BadRequestException('Tier is not found');

        const loyaltyProgram = await this.loyaltyProgramRepository.create(
          payload,
          runner,
        );

        const loyaltyProgramTierPayload = payload.tier_ids.map((tier_id) => {
          return {
            tier_id,
            loyalty_program_id: loyaltyProgram.id,
          };
        });

        const loyaltyProramTiers =
          await this.loyaltyProgramTierRepository.create(
            loyaltyProgramTierPayload,
            runner,
          );

        const detailLoyaltyProgramTiers =
          await this.loyaltyProgramTierRepository.findByIds(
            loyaltyProramTiers.map((item) => item.id),
            runner,
          );

        return {
          ...loyaltyProgram,
          tier_ids: detailLoyaltyProgramTiers.map((item) => item.tier_id),
        };
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(
    query: FindAllQueryDto,
  ): Promise<FindAllResponseDto<FindAllResponse>> {
    try {
      const result = { data: [], totalData: 0 };

      const [data, totalData] = await Promise.all([
        this.loyaltyProgramRepository.findAll(query),
        this.loyaltyProgramRepository.findAllTotal(),
      ]);
      if (!totalData) return result;

      result.totalData = totalData;

      const loyaltyProgramIds = data.map((item) => item.id);
      const loyaltyProgramTier =
        await this.loyaltyProgramTierRepository.findByLoyaltyProgramIds(
          loyaltyProgramIds,
        );

      const mapTierByLoyaltyProgramId = new Map<string, any>();
      for (const item of loyaltyProgramTier) {
        let current = mapTierByLoyaltyProgramId.get(item.loyalty_program_id);
        if (!current) {
          mapTierByLoyaltyProgramId.set(item.loyalty_program_id, []);
        }
        current = mapTierByLoyaltyProgramId.get(item.loyalty_program_id);
        current.push({
          tier_id: item.tier_id,
          name: item.name,
          minimum_point: item.minimum_point,
          maximum_point: item.maximum_point,
        });
        mapTierByLoyaltyProgramId.set(item.loyalty_program_id, current);
      }

      result.data = data.map((item) => {
        return {
          ...item,
          tiers: mapTierByLoyaltyProgramId.get(item.id),
        };
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
