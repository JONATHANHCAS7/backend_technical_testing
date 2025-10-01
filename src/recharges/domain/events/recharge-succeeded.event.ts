import { Transaction } from '../entities/transaction.entity';

export class RechargeSucceededEvent {
  constructor(public readonly transaction: Transaction) {}
}