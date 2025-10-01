import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionRepository } from '../../../../domain/recharges/repositories/transaction.repository';
import { Transaction } from '../../../../domain/recharges/entities/transaction.entity';
import { TransactionOrmEntity } from '../entities/transaction.orm-entity';
import { Amount } from '../../../../domain/recharges/value-objects/amount';
import { PhoneNumber } from '../../../../domain/recharges/value-objects/phone-number';

@Injectable()
export class TypeOrmTransactionRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionOrmEntity)
    private readonly ormRepository: Repository<TransactionOrmEntity>,
  ) {}

  async save(transaction: Transaction): Promise<void> {
    const ormEntity = new TransactionOrmEntity();
    ormEntity.id = transaction.getId();
    ormEntity.user = transaction.getUser();
    ormEntity.amount = transaction.getAmount().getValue();
    ormEntity.phoneNumber = transaction.getPhoneNumber().getValue();
    ormEntity.createdAt = transaction.getCreatedAt();

    await this.ormRepository.save(ormEntity);
  }

  async findByUser(user: string): Promise<Transaction[]> {
    const ormEntities = await this.ormRepository.find({
      where: { user },
      order: { createdAt: 'DESC' },
    });

    return ormEntities.map(orm => new Transaction(
      orm.id,
      orm.user,
      new Amount(orm.amount),
      new PhoneNumber(orm.phoneNumber),
      orm.createdAt,
    ));
  }
}