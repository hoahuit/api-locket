import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './wallet.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  getWallets(@Request() req) {
    return this.walletService.getWallets(req.user.userId);
  }

  @Post()
  createWallet(@Request() req, @Body() createWalletDto: CreateWalletDto) {
    return this.walletService.createWallet(req.user.userId, createWalletDto);
  }
}
