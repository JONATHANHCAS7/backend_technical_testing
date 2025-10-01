import { Injectable } from '@nestjs/common';
import { BuyRechargeUseCase } from '../use-cases/buy-recharge.use-case';
import { GetRechargeHistoryUseCase } from '../use-cases/get-recharge-history.use-case';
import { Transaction } from '../../../domain/recharges/entities/transaction.entity';

@Injectable()
export class RechargeApplicationService {
  constructor(
    private readonly buyRechargeUseCase: BuyRechargeUseCase,
    private readonly getRechargeHistoryUseCase: GetRechargeHistoryUseCase,
  ) {}

  async buyRecharge(user: string, amount: number, phoneNumber: string): Promise<Transaction> {
    return this.buyRechargeUseCase.execute(user, amount, phoneNumber);
  }

  async getRechargeHistory(user: string): Promise<Transaction[]> {
    return this.getRechargeHistoryUseCase.execute(user);
  }
}