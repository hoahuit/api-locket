import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWalletDto } from './wallet.dto';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async getWallets(userId: string) {
    const wallets = await this.prisma.wallet.findMany({ where: { userId } });
    if (wallets.length === 0) {
      const defaultWallet = await this.prisma.wallet.create({
        data: {
          id: `wal_${Date.now()}_default`,
          name: 'Ví Tiền Mặt',
          type: 'Cash',
          balance: 10000000, // 10 million VND
          color: '#10b981',
          userId,
        },
      });
      return [defaultWallet];
    }
    return wallets;
  }

  async createWallet(userId: string, createWalletDto: CreateWalletDto) {
    const totalWallets = await this.prisma.wallet.count();
    return this.prisma.wallet.create({
      data: {
        id: `wal_${Date.now()}_${totalWallets + 1}`,
        name: createWalletDto.name,
        type: createWalletDto.type,
        balance: createWalletDto.balance,
        color: createWalletDto.color,
        userId,
      },
    });
  }
}
