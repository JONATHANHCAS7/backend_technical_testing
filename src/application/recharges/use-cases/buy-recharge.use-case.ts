import { Injectable, Inject } from '@nestjs/common';
import type { TransactionRepository } from '../../../domain/recharges/repositories/transaction.repository';
import type { EventBus } from '../../../domain/recharges/events/event-bus';
import { Transaction } from '../../../domain/recharges/entities/transaction.entity';
import { Amount } from '../../../domain/recharges/value-objects/amount';
import { PhoneNumber } from '../../../domain/recharges/value-objects/phone-number';
import { RechargeSucceededEvent } from '../../../domain/recharges/events/recharge-succeeded.event';

@Injectable()
export class BuyRechargeUseCase {
  constructor(
    @Inject('TransactionRepository') private readonly transactionRepository: TransactionRepository,
    @Inject('EventBus') private readonly eventBus: EventBus,
  ) {}

  async execute(user: string, amount: number, phoneNumber: string): Promise<Transaction> {
    const amountVO = new Amount(amount);
    const phoneNumberVO = new PhoneNumber(phoneNumber);

    const transaction = Transaction.create(user, amountVO, phoneNumberVO);

    await this.transactionRepository.save(transaction);

    // Publicar evento
    this.eventBus.publish(new RechargeSucceededEvent(transaction));

    return transaction;
  }
}