import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Runner } from '../../utils/typeorm/run.in.transaction';
import { TransactionItem } from '../../entities/transaction-item.entity';
import { CreateNewTransactionItemPayloadDto } from '../dto/transaction-item.dto';

@Injectable()
export class TransactionItemRepository {
  constructor(private readonly dataSource: DataSource) {}

  async bulkCreate(
    payload: CreateNewTransactionItemPayloadDto[],
    runner?: Runner,
  ): Promise<any> {
    try {
      let em = this.dataSource.manager;
      if (runner) {
        em = runner.manager;
      }

      const result = await em
        .createQueryBuilder()
        .insert()
        .into(TransactionItem)
        .values(payload)
        .execute();

      return result.raw;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
