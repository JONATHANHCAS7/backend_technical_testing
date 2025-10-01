import { Injectable, Inject } from '@nestjs/common';
import type { TransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/entities/transaction.entity';

@Injectable()
export class GetRechargeHistoryUseCase {
  constructor(@Inject('TransactionRepository') private readonly transactionRepository: TransactionRepository) {}

  async execute(user: string): Promise<Transaction[]> {
    return this.transactionRepository.findByUser(user);
  }
}