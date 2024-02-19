import { Module } from '@nestjs/common';
import { LoyaltyProgramController } from './loyalty-program.controller';
import { LoyaltyProgramService } from './loyalty-program.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoyaltyProgram } from '../entities/loyalty-program.entity';
import { LoyaltyProgramRepository } from './repositories/loyalty-program.repository';
import { TierModel } from '../tier/tier.repository';
import { LoyaltyProgramTierRepository } from './repositories/loyalty-program-tier.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LoyaltyProgram])],
  controllers: [LoyaltyProgramController],
  providers: [
    LoyaltyProgramService,
    LoyaltyProgramRepository,
    TierModel,
    LoyaltyProgramTierRepository,
  ],
})
export class LoyaltyProgramModule {}
