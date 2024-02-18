import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity('transactions')
export class Transaction {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  code: string;

  @ManyToOne(() => Member)
  @JoinColumn()
  member: Member;

  @ApiProperty()
  @Column({ type: 'varchar' })
  member_id: string;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  total_amount_primary: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  total_amount: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  redeemed_point: number;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
