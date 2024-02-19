import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Runner } from '../utils/typeorm/run.in.transaction';
import { PointHistory } from '../entities/point-history.entity';
import { CreateNewPointHistoryDto } from './dto/point-history.dto';

@Injectable()
export class PointHistoryRepository {
  constructor(private readonly dataSource: DataSource) {}

  async create(
    payload: CreateNewPointHistoryDto,
    runner?: Runner,
  ): Promise<PointHistory> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      const result = await em
        .createQueryBuilder()
        .insert()
        .into(PointHistory)
        .values(payload)
        .execute();

      return result.raw[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
