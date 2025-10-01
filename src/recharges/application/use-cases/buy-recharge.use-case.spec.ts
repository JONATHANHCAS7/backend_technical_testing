import { Test, TestingModule } from '@nestjs/testing';
import { RechargeApplicationService } from './recharge.orchestration.use-case';
import { BuyRechargeUseCase } from './buy-recharge.use-case';
import { GetRechargeHistoryUseCase } from './get-recharge-history.use-case';
import { Transaction } from '../../domain/entities/transaction.entity';
import { Amount } from '../../domain/value-objects/amount';
import { PhoneNumber } from '../../domain/value-objects/phone-number';

describe('RechargeApplicationService', () => {
  let service: RechargeApplicationService;
  let buyRechargeUseCase: BuyRechargeUseCase;
  let getRechargeHistoryUseCase: GetRechargeHistoryUseCase;

  const mockBuyRechargeUseCase = {
    execute: jest.fn(),
  };

  const mockGetRechargeHistoryUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RechargeApplicationService,
        {
          provide: BuyRechargeUseCase,
          useValue: mockBuyRechargeUseCase,
        },
        {
          provide: GetRechargeHistoryUseCase,
          useValue: mockGetRechargeHistoryUseCase,
        },
      ],
    }).compile();

    service = module.get<RechargeApplicationService>(RechargeApplicationService);
    buyRechargeUseCase = module.get<BuyRechargeUseCase>(BuyRechargeUseCase);
    getRechargeHistoryUseCase = module.get<GetRechargeHistoryUseCase>(GetRechargeHistoryUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('buyRecharge', () => {
    it('should execute buy recharge use case', async () => {
      const user = 'testuser';
      const amount = 5000;
      const phoneNumber = '3123456789';
      const mockTransaction = new Transaction(
        'txn_123',
        user,
        new Amount(amount),
        new PhoneNumber(phoneNumber),
        new Date(),
      );

      mockBuyRechargeUseCase.execute.mockResolvedValue(mockTransaction);

      const result = await service.buyRecharge(user, amount, phoneNumber);

      expect(mockBuyRechargeUseCase.execute).toHaveBeenCalledWith(user, amount, phoneNumber);
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('getRechargeHistory', () => {
    it('should execute get recharge history use case', async () => {
      const user = 'testuser';
      const mockTransactions = [
        new Transaction(
          'txn_123',
          user,
          new Amount(5000),
          new PhoneNumber('3123456789'),
          new Date(),
        ),
      ];

      mockGetRechargeHistoryUseCase.execute.mockResolvedValue(mockTransactions);

      const result = await service.getRechargeHistory(user);

      expect(mockGetRechargeHistoryUseCase.execute).toHaveBeenCalledWith(user);
      expect(result).toEqual(mockTransactions);
    });
  });
});
