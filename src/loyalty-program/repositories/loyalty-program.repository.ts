import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  CreateLoyaltyProgramRequestDto,
  FindAllQueryDto,
} from '../dto/loyalty-program.dto';
import { LoyaltyProgram } from '../../entities/loyalty-program.entity';
import { Runner } from '../../utils/typeorm/run.in.transaction';
import { LoyaltyProgramTier } from '../../entities/loyalty-program-tier.entity';

@Injectable()
export class LoyaltyProgramRepository {
  constructor(private readonly dataSource: DataSource) {}

  async create(
    payload: CreateLoyaltyProgramRequestDto,
    runner?: Runner,
  ): Promise<LoyaltyProgram> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      const result = await em
        .createQueryBuilder()
        .insert()
        .into(LoyaltyProgram)
        .values(payload)
        .execute();

      return result.raw[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(query: FindAllQueryDto): Promise<LoyaltyProgram[]> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder()
        .select([
          'lp.id AS id',
          'lp.name AS name',
          'lp.type AS type',
          'lp.transaction_amount AS transaction_amount',
          'lp.quantity AS quantity',
          'lp.is_first_purchase AS is_first_purchase',
          'lp.is_transactional_combine AS is_transactional_combine',
          'lp.percentage_benefit AS percentage_benefit',
          'lp.fixed_point_benefit AS fixed_point_benefit',
          'lp.maximum_point_benefit AS maximum_point_benefit',
          'lp.start_date AS start_date',
          'lp.end_date AS end_date',
          'lp.created_at AS created_at',
          'lp.updated_at AS updated_at',
        ])
        .from(LoyaltyProgram, 'lp')
        .orderBy('created_at', 'DESC')
        .limit(query.limit)
        .offset(query.offset)
        .getRawMany();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAllTotal(): Promise<number> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder()
        .select(['COUNT(id) AS count'])
        .from(LoyaltyProgram, 'lp')
        .getCount();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findByDateAndTier(
    date: string,
    tier_id: string,
    runner?: Runner,
  ): Promise<LoyaltyProgram> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      return await em
        .createQueryBuilder()
        .select([
          'lp.id AS id',
          'lp.name AS name',
          'lp.type AS type',
          'lp.transaction_amount AS transaction_amount',
          'lp.quantity AS quantity',
          'lp.is_first_purchase AS is_first_purchase',
          'lp.is_transactional_combine AS is_transactional_combine',
          'lp.percentage_benefit AS percentage_benefit',
          'lp.fixed_point_benefit AS fixed_point_benefit',
          'lp.maximum_point_benefit AS maximum_point_benefit',
          'lp.start_date AS start_date',
          'lp.end_date AS end_date',
          'lp.created_at AS created_at',
          'lp.updated_at AS updated_at',
        ])
        .from(LoyaltyProgram, 'lp')
        .innerJoin(LoyaltyProgramTier, 'lpt', 'lpt.loyalty_program_id = lp.id')
        .where('lp.start_date <= :date AND lp.end_date >= :date', { date })
        .andWhere('lpt.tier_id = :tier_id', { tier_id })
        .getRawOne();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
