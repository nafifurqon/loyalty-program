import { Module } from '@nestjs/common';
import { PointHistoryController } from './point-history.controller';
import { PointHistoryService } from './point-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointHistory } from '../entities/point-history.entity';
import { PointHistoryRepository } from './point-history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PointHistory])],
  controllers: [PointHistoryController],
  providers: [PointHistoryService, PointHistoryRepository],
})
export class PointHistoryModule {}
