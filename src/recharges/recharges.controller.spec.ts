import { Test, TestingModule } from '@nestjs/testing';
import { RechargesController } from './interfaces/controllers/recharges.controller';
import { RechargeApplicationService } from './application/services/recharge.application-service';
import { Transaction } from './domain/entities/transaction.entity';
import { Amount } from './domain/value-objects/amount';
import { PhoneNumber } from './domain/value-objects/phone-number';

describe('RechargesController', () => {
  let controller: RechargesController;
  let service: RechargeApplicationService;

  const mockRechargeApplicationService = {
    buyRecharge: jest.fn(),
    getRechargeHistory: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RechargesController],
      providers: [
        {
          provide: RechargeApplicationService,
          useValue: mockRechargeApplicationService,
        },
      ],
    }).compile();

    controller = module.get<RechargesController>(RechargesController);
    service = module.get<RechargeApplicationService>(RechargeApplicationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('buy', () => {
    it('should call buyRecharge and return formatted response', async () => {
      const user = { username: 'testuser' };
      const mockTransaction = new Transaction(
        'txn_123',
        'testuser',
        new Amount(5000),
        new PhoneNumber('3123456789'),
        new Date(),
      );

      mockRechargeApplicationService.buyRecharge.mockResolvedValue(mockTransaction);

      const result = await controller.buy({ amount: 5000, phoneNumber: '3123456789' }, { user });

      expect(mockRechargeApplicationService.buyRecharge).toHaveBeenCalledWith('testuser', 5000, '3123456789');
      expect(result).toEqual({
        success: true,
        message: 'Recarga procesada exitosamente',
        transactionId: 'txn_123',
        amount: 5000,
        phoneNumber: '3123456789',
        user: 'testuser',
      });
    });
  });

  describe('getHistory', () => {
    it('should call getRechargeHistory and return formatted transactions', async () => {
      const user = { username: 'testuser' };
      const mockTransactions = [
        new Transaction(
          'txn_123',
          'testuser',
          new Amount(5000),
          new PhoneNumber('3123456789'),
          new Date(),
        ),
      ];

      mockRechargeApplicationService.getRechargeHistory.mockResolvedValue(mockTransactions);

      const result = await controller.getHistory({ user });

      expect(mockRechargeApplicationService.getRechargeHistory).toHaveBeenCalledWith('testuser');
      expect(result).toEqual([
        {
          id: 'txn_123',
          user: 'testuser',
          amount: 5000,
          phoneNumber: '3123456789',
          createdAt: mockTransactions[0].getCreatedAt(),
        },
      ]);
    });
  });
});
