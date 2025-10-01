import { Transaction } from '../entities/transaction.entity';

export interface TransactionRepository {
  save(transaction: Transaction): Promise<void>;
  findByUser(user: string): Promise<Transaction[]>;
}