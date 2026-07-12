"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WalletService = class WalletService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getWallets(userId) {
        const wallets = await this.prisma.wallet.findMany({ where: { userId } });
        if (wallets.length === 0) {
            const defaultWallet = await this.prisma.wallet.create({
                data: {
                    id: `wal_${Date.now()}_default`,
                    name: 'Ví Tiền Mặt',
                    type: 'Cash',
                    balance: 10000000,
                    color: '#10b981',
                    userId,
                },
            });
            return [defaultWallet];
        }
        return wallets;
    }
    async createWallet(userId, createWalletDto) {
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
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WalletService);
//# sourceMappingURL=wallet.service.js.map