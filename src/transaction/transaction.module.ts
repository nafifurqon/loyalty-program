import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MemberRepository } from '../member/member.repository';
import { ProductRepository } from '../product/product.repository';
import { Transaction } from '../entities/transaction.entity';
import { TransactionItem } from '../entities/transaction-item.entity';
import { LoyaltyProgramRepository } from '../loyalty-program/repositories/loyalty-program.repository';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionItemRepository } from './repositories/transaction-item.repository';
import { PointHistoryRepository } from '../point-history/point-history.repository';
import { TierModel } from '../tier/tier.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionItem])],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    MemberRepository,
    ProductRepository,
    LoyaltyProgramRepository,
    TransactionRepository,
    TransactionItemRepository,
    PointHistoryRepository,
    TierModel,
  ],
})
export class TransactionModule {}
