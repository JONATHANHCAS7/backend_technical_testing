import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class TransactionOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;
}