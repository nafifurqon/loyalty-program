import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Tier } from '../entities/tier.entity';
import { FindAllQueryDto } from './dto/tier.dto';

@Injectable()
export class TierModel {
  constructor(private readonly dataSource: DataSource) {}

  async findAll(query: FindAllQueryDto): Promise<Tier[]> {
    try {
      const sqlQuery = this.dataSource.manager
        .createQueryBuilder()
        .select([
          't.id AS id',
          't.name AS name',
          't.minimum_point AS minimum_point',
          't.maximum_point AS maximum_point',
          't.created_at AS created_at',
          't.updated_at AS updated_at',
        ])
        .from(Tier, 't')
        .orderBy('minimum_point', 'ASC');

      if (query.display !== 'all') {
        sqlQuery.limit(query.limit).offset(query.offset);
      }

      return await sqlQuery.getRawMany();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAllTotal(): Promise<number> {
    try {
      const sqlQuery = this.dataSource.manager
        .createQueryBuilder()
        .select(['COUNT(id) AS count'])
        .from(Tier, 't');

      return await sqlQuery.getCount();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
