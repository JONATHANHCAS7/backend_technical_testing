import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RechargesModule } from './recharges/recharges.module';
import { TransactionOrmEntity } from './infrastructure/persistence/typeorm/entities/transaction.orm-entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [TransactionOrmEntity],
      synchronize: true, // Solo para desarrollo
    }),
    AuthModule,
    RechargesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
