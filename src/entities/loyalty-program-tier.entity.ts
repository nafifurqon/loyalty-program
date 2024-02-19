import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tier } from './tier.entity';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity('loyalty_program_tiers')
export class LoyaltyProgramTier {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tier)
  @JoinColumn({
    name: 'tier_id',
  })
  tier: Tier;

  @ApiProperty()
  @Column({ type: 'varchar' })
  tier_id: string;

  @ManyToOne(() => LoyaltyProgram)
  @JoinColumn({
    name: 'loyalty_program_id',
  })
  loyalty_program: LoyaltyProgram;

  @ApiProperty()
  @Column({ type: 'varchar' })
  loyalty_program_id: string;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
