import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { Product } from './product.entity';

@Entity('transaction_items')
export class TransactionItem {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Transaction)
  @JoinColumn()
  transaction: Transaction;

  @ApiProperty()
  @Column({ type: 'varchar' })
  transaction_id: string;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ApiProperty()
  @Column({ type: 'varchar' })
  Product_id: string;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  price: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  quantity: number;

  @ApiProperty()
  @Column({ type: 'int', width: 11, default: 0 })
  subtotal: number;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
