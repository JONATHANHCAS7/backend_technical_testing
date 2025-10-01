import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RechargesController } from './interfaces/controllers/recharges.controller';
import { RechargeApplicationService } from './application/services/recharge.application-service';
import { BuyRechargeUseCase } from './application/use-cases/buy-recharge.use-case';
import { GetRechargeHistoryUseCase } from './application/use-cases/get-recharge-history.use-case';
import { TypeOrmTransactionRepository } from './infrastructure/persistence/typeorm/repositories/transaction.repository';
import { InMemoryEventBus } from './infrastructure/events/in-memory-event-bus';
import { TransactionOrmEntity } from './infrastructure/persistence/typeorm/entities/transaction.orm-entity';
import { RechargeSucceededEvent } from './domain/events/recharge-succeeded.event';
import type { EventBus } from './domain/events/event-bus';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionOrmEntity])],
  providers: [
    RechargeApplicationService,
    BuyRechargeUseCase,
    GetRechargeHistoryUseCase,
    {
      provide: 'TransactionRepository',
      useClass: TypeOrmTransactionRepository,
    },
    {
      provide: 'EventBus',
      useClass: InMemoryEventBus,
    },
  ],
  controllers: [RechargesController],
})
export class RechargesModule implements OnModuleInit {
  constructor(@Inject('EventBus') private readonly eventBus: EventBus) {}

  onModuleInit() {
    // Suscribir handler para evento RechargeSucceeded
    this.eventBus.subscribe('RechargeSucceededEvent', (event: RechargeSucceededEvent) => {
      console.log(`Evento recibido: Recarga exitosa para usuario ${event.transaction.getUser()} con monto ${event.transaction.getAmount().getValue()}`);
      // Aquí se podría enviar notificación, actualizar métricas, etc.
    });
  }
}
