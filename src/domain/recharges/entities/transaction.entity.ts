import { Amount } from '../value-objects/amount';
import { PhoneNumber } from '../value-objects/phone-number';

export class Transaction {
  private id: string;
  private user: string;
  private amount: Amount;
  private phoneNumber: PhoneNumber;
  private createdAt: Date;

  constructor(id: string, user: string, amount: Amount, phoneNumber: PhoneNumber, createdAt: Date) {
    this.id = id;
    this.user = user;
    this.amount = amount;
    this.phoneNumber = phoneNumber;
    this.createdAt = createdAt;
  }

  static create(user: string, amount: Amount, phoneNumber: PhoneNumber): Transaction {
    return new Transaction(
      `txn_${Date.now()}`,
      user,
      amount,
      phoneNumber,
      new Date(),
    );
  }

  getId(): string {
    return this.id;
  }

  getUser(): string {
    return this.user;
  }

  getAmount(): Amount {
    return this.amount;
  }

  getPhoneNumber(): PhoneNumber {
    return this.phoneNumber;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }
}