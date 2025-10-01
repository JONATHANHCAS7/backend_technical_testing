import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { RechargeApplicationService } from '../../application/use-cases/recharge.orchestration.use-case';
import { RechargeBuyDto } from '../../application/dto/recharge-buy.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@Controller('recharges')
export class RechargesController {
  constructor(private readonly rechargeApplicationService: RechargeApplicationService) {}

  @Post('buy')
  @UseGuards(JwtAuthGuard)
  async buy(@Body() rechargeDto: RechargeBuyDto, @Request() req) {
    const transaction = await this.rechargeApplicationService.buyRecharge(
      req.user.username,
      rechargeDto.amount,
      rechargeDto.phoneNumber,
    );
    return {
      success: true,
      message: 'Recarga procesada exitosamente',
      transactionId: transaction.getId(),
      amount: transaction.getAmount().getValue(),
      phoneNumber: transaction.getPhoneNumber().getValue(),
      user: transaction.getUser(),
    };
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getHistory(@Request() req) {
    const transactions = await this.rechargeApplicationService.getRechargeHistory(req.user.username);
    return transactions.map(t => ({
      id: t.getId(),
      user: t.getUser(),
      amount: t.getAmount().getValue(),
      phoneNumber: t.getPhoneNumber().getValue(),
      createdAt: t.getCreatedAt(),
    }));
  }
}
