import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../utils/enum.util';
import { Tier } from './tier.entity';

@Entity('members')
export class Member {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @ApiProperty()
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  birth_date: Date;

  @ApiProperty()
  @Column({ type: 'varchar' })
  address: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  referal_code: string;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  balance_point: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.Active,
  })
  status: number;

  @ManyToOne(() => Tier)
  @JoinColumn({
    name: 'tier_id',
  })
  tier: Tier;

  @ApiProperty()
  @Column({ type: 'varchar' })
  tier_id: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
