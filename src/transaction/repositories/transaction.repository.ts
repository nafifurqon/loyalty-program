import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Transaction } from '../../entities/transaction.entity';
import { Runner } from '../../utils/typeorm/run.in.transaction';
import { CreateNewTransactionPayloadDto } from '../dto/transaction.dto';

@Injectable()
export class TransactionRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findLatestByDate(date: string, runner?: Runner): Promise<Transaction> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      return await em
        .createQueryBuilder()
        .select(['t.code AS code'])
        .from(Transaction, 't')
        .where('DATE(t.created_at) = :date', { date })
        .orderBy('t.id', 'DESC')
        .getRawOne();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async checkExistsByMemberId(
    memberId: string,
    runner?: Runner,
  ): Promise<boolean> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      return await em
        .createQueryBuilder()
        .select(['t.id AS id'])
        .from(Transaction, 't')
        .where('t.member_id = :memberId', { memberId })
        .getExists();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(
    payload: CreateNewTransactionPayloadDto,
    runner?: Runner,
  ): Promise<string> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      const result = await em
        .createQueryBuilder()
        .insert()
        .into(Transaction)
        .values(payload)
        .execute();

      return result.raw[0].id;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
