import { PrismaService } from '../prisma/prisma.service';
import { CreateWalletDto } from './wallet.dto';
export declare class WalletService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getWallets(userId: string): Promise<{
        id: string;
        name: string;
        color: string;
        type: string;
        balance: number;
        userId: string;
    }[]>;
    createWallet(userId: string, createWalletDto: CreateWalletDto): Promise<{
        id: string;
        name: string;
        color: string;
        type: string;
        balance: number;
        userId: string;
    }>;
}
