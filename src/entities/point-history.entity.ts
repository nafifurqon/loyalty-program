import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';
import { Transaction } from './transaction.entity';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity('point_histories')
export class PointHistory {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Member)
  @JoinColumn()
  member: Member;

  @ApiProperty()
  @Column({ type: 'varchar' })
  member_id: string;

  @ManyToOne(() => Transaction)
  @JoinColumn()
  transaction: Transaction;

  @ApiProperty()
  @Column({ type: 'varchar' })
  transaction_id: string;

  @ManyToOne(() => LoyaltyProgram)
  @JoinColumn()
  loyalty_program: LoyaltyProgram;

  @ApiProperty()
  @Column({ type: 'varchar' })
  loyalty_program_id: string;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  earned_point: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  redeemed_point: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  existing_point: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  balance_point: number;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
