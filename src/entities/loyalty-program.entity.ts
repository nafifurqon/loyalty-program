import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LoyaltyProgramType } from '../utils/enum.util';
import { Tier } from './tier.entity';

@Entity('loyalty_programs')
export class LoyaltyProgram {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: LoyaltyProgramType,
    default: LoyaltyProgramType.Transactional,
  })
  type: string;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  transaction_amount: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  quantity: number;

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  is_first_purchase: boolean;

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  is_transactional_combine: boolean;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  percentage_benefit: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  fixed_point_benefit: number;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  start_date: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  end_date: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToMany(() => Tier, (tier) => tier.loyalty_programs)
  tiers: Tier[];
}
