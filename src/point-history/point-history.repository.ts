import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Runner } from '../utils/typeorm/run.in.transaction';
import { PointHistory } from '../entities/point-history.entity';
import {
  CreateNewPointHistoryDto,
  FindAllQueryDto,
  FindAllRepositoryResponse,
  FindByMemberIdsAndTypeResponseDto,
} from './dto/point-history.dto';
import { Transaction } from '../entities/transaction.entity';
import { LoyaltyProgram } from '../entities/loyalty-program.entity';

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

  async findByMemberIdsAndType(
    memberIds: string[],
    type: 'earn' | 'redeem',
  ): Promise<FindByMemberIdsAndTypeResponseDto[]> {
    try {
      const query = this.dataSource.manager
        .createQueryBuilder()
        .select([
          'ph.transaction_id AS transaction_id',
          't.code AS transaction_code',
          't.created_at AS transaction_date',
          'ph.member_id AS member_id',
        ])
        .from(PointHistory, 'ph')
        .innerJoin(Transaction, 't', 't.id = ph.transaction_id')
        .where('ph.member_id IN (:...memberIds)', { memberIds });

      if (type === 'earn') {
        query.addSelect('ph.earned_point AS point');
        query.addSelect("'earned' AS type");
        query.andWhere('ph.earned_point > 0');
      } else if (type === 'redeem') {
        query.addSelect('ph.redeemed_point AS point');
        query.addSelect("'redeemed' AS type");
        query.andWhere('ph.redeemed_point > 0');
      }

      return await query.getRawMany<FindByMemberIdsAndTypeResponseDto>();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(query: FindAllQueryDto): Promise<FindAllRepositoryResponse> {
    const { start_date, end_date, member_id, loyalty_name, type } = query;

    try {
      const sqlQuery = this.dataSource.manager
        .createQueryBuilder()
        .select([
          'ph.id AS id',
          'ph.member_id AS member_id',
          'ph.transaction_id AS transaction_id',
          't.code AS transaction_code',
          't.created_at AS transaction_date',
          'lp.name AS loyalty_program_name',
          'ph.existing_point AS existing_point',
          'ph.balance_point AS balance_point',
        ])
        .from(PointHistory, 'ph')
        .innerJoin(Transaction, 't', 't.id = ph.transaction_id')
        .leftJoin(LoyaltyProgram, 'lp', 'lp.id = ph.loyalty_program_id')
        .where('ph.created_at BETWEEN :start_date AND :end_date', {
          start_date,
          end_date,
        });

      if (type === 'earn') {
        sqlQuery.addSelect('ph.earned_point AS point');
        sqlQuery.addSelect("'earned' AS type");
        sqlQuery.andWhere('ph.earned_point > 0');
      } else if (type === 'redeem') {
        sqlQuery.addSelect('ph.redeemed_point AS point');
        sqlQuery.addSelect("'redeemed' AS type");
        sqlQuery.andWhere('ph.redeemed_point > 0');
      }

      if (member_id) {
        sqlQuery.andWhere('ph.member_id = :member_id', { member_id });
      }

      if (loyalty_name) {
        sqlQuery.andWhere('lp.name LIKE :loyalty_name', {
          loyalty_name: `%${loyalty_name}%`,
        });
      }

      const result = await sqlQuery.getRawMany();

      return { data: result, count: result.length };
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
