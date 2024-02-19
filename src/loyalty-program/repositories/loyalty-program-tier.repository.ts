import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateLoyaltyProgramTierDto } from '../dto/loyalty-program-tier.dto';
import { Runner } from '../../utils/typeorm/run.in.transaction';
import { LoyaltyProgramTier } from '../../entities/loyalty-program-tier.entity';
import { FindByLoyaltyProgramIdsResponse } from '../dto/loyalty-program.dto';
import { Tier } from '../../entities/tier.entity';

@Injectable()
export class LoyaltyProgramTierRepository {
  constructor(private readonly dataSource: DataSource) {}

  async create(
    payload: CreateLoyaltyProgramTierDto[],
    runner?: Runner,
  ): Promise<LoyaltyProgramTier[]> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      const result = await em
        .createQueryBuilder()
        .insert()
        .into(LoyaltyProgramTier)
        .values(payload)
        .execute();

      return result.raw;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findByIds(
    ids: string[],
    runner?: Runner,
  ): Promise<LoyaltyProgramTier[]> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      return await em
        .createQueryBuilder()
        .select([
          'lpt.id AS id',
          'lpt.tier_id AS tier_id',
          'lpt.loyalty_program_id AS loyalty_program_id',
        ])
        .from(LoyaltyProgramTier, 'lpt')
        .where('lpt.id IN (:...ids)', { ids })
        .getRawMany();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findByLoyaltyProgramIds(
    loyaltyProgramIds: string[],
  ): Promise<FindByLoyaltyProgramIdsResponse[]> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder()
        .select([
          'lpt.tier_id as tier_id',
          'lpt.loyalty_program_id as loyalty_program_id',
          't."name" as name',
          't.minimum_point as minimum_point',
          't.maximum_point as maximum_point',
        ])
        .from(LoyaltyProgramTier, 'lpt')
        .innerJoin(Tier, 't', 't.id = lpt.tier_id')
        .where('lpt.loyalty_program_id IN (:...loyaltyProgramIds)', {
          loyaltyProgramIds,
        })
        .getRawMany();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
