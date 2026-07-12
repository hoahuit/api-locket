import { WalletService } from './wallet.service';
import { CreateWalletDto } from './wallet.dto';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getWallets(req: any): Promise<{
        id: string;
        name: string;
        color: string;
        type: string;
        balance: number;
        userId: string;
    }[]>;
    createWallet(req: any, createWalletDto: CreateWalletDto): Promise<{
        id: string;
        name: string;
        color: string;
        type: string;
        balance: number;
        userId: string;
    }>;
}
