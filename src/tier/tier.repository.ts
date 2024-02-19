import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Tier } from '../entities/tier.entity';
import { FindAllQueryDto } from './dto/tier.dto';
import { Runner } from '../utils/typeorm/run.in.transaction';

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

  async findOne(param: { minimum_point?: number; id?: string }): Promise<Tier> {
    try {
      const sqlQuery = this.dataSource.manager
        .createQueryBuilder()
        .select([
          't.id AS id',
          't.name AS name',
          't.minimum_point AS minimum_point',
          't.maximum_point AS maximum_point',
        ])
        .from(Tier, 't')
        .where('1 = 1');

      console.log('param', param);

      const { id, minimum_point } = param;

      if (id) {
        sqlQuery.andWhere('t.id = :id', { id });
      }

      if (minimum_point) {
        sqlQuery.andWhere('t.minimum_point = :minimum_point', {
          minimum_point,
        });
      }

      return sqlQuery.getRawOne();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findByIds(ids: string[], runner?: Runner): Promise<Tier[]> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      return await em
        .createQueryBuilder()
        .select([
          't.id AS id',
          't.name AS name',
          't.minimum_point AS minimum_point',
          't.maximum_point AS maximum_point',
        ])
        .from(Tier, 't')
        .where('t.id IN (:...ids)', { ids })
        .getRawMany();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
