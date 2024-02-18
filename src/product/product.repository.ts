import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateProductRequestDto, FindAllQueryDto } from './dto/product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(private readonly dataSource: DataSource) {}

  async create(payload: CreateProductRequestDto): Promise<Product> {
    try {
      const result = await this.dataSource.manager
        .createQueryBuilder()
        .insert()
        .into(Product)
        .values(payload)
        .execute();

      return result.raw[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(query: FindAllQueryDto): Promise<Product[]> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder()
        .select([
          'p.id AS id',
          'p.name AS name',
          'p.price AS price',
          'p.created_at AS created_at',
          'p.updated_at AS updated_at',
        ])
        .from(Product, 'p')
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
        .from(Product, 'p')
        .getCount();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOneById(id: string): Promise<Product> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder()
        .select('*')
        .from(Product, 'p')
        .where('id = :id', { id })
        .getRawOne();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(payload: CreateProductRequestDto, id: string): Promise<boolean> {
    try {
      await this.dataSource.manager
        .createQueryBuilder()
        .update(Product)
        .set(payload)
        .where('id = :id', { id })
        .execute();

      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
