import { Module } from '@nestjs/common';
import { TierController } from './tier.controller';
import { TierService } from './tier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tier } from '../entities/tier.entity';
import { TierModel } from './tier.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tier])],
  controllers: [TierController],
  providers: [TierService, TierModel],
})
export class TierModule {}
