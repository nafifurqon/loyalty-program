import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Member } from '../entities/member.entity';
import { CreateMemberRequestDto, FindAllQueryDto } from './dto/member.dto';

@Injectable()
export class MemberRepository {
  constructor(private readonly dataSource: DataSource) {}

  async create(payload: CreateMemberRequestDto): Promise<Member> {
    try {
      const result = await this.dataSource.manager
        .createQueryBuilder()
        .insert()
        .into(Member)
        .values(payload)
        .execute();

      return result.raw[0];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAll(query: FindAllQueryDto): Promise<Member[]> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder()
        .select([
          'm.id AS id',
          'm.name AS name',
          'm.email AS email',
          'm.phone_number AS phone_number',
          'm.created_at AS join_date',
          'm.balance_point AS remained_point',
          'm.status AS status',
        ])
        .from(Member, 'm')
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
        .from(Member, 'm')
        .getCount();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findById(id: string): Promise<Member> {
    try {
      return await this.dataSource.manager
        .createQueryBuilder()
        .select([
          'm.id AS id',
          'm.name AS name',
          'm.email AS email',
          'm.phone_number AS phone_number',
          'm.birth_date AS birth_date',
          'm.address AS address',
          'm.created_at AS join_date',
          'm.referal_code AS referal_code',
          'm.balance_point AS remained_point',
          'm.status AS status',
          'm.tier_id AS tier_id',
        ])
        .from(Member, 'm')
        .where('m.id = :id', { id })
        .getRawOne();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
