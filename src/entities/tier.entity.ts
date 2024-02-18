import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LoyaltyProgram } from './loyalty-program.entity';

@Entity('tiers')
export class Tier {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  minimum_point: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  maximum_point: number;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToMany(() => LoyaltyProgram, (loyaltyProgram) => loyaltyProgram.tiers, {
    cascade: true,
  })
  @JoinTable({
    joinColumn: {
      name: 'tier_id',
    },
    inverseJoinColumn: {
      name: 'loyalty_program_id',
    },
  })
  loyalty_programs: LoyaltyProgram[];
}
