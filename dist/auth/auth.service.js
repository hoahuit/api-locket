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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    signToken(userId, email) {
        return this.jwtService.sign({ sub: userId, email });
    }
    mapUser(user) {
        const { password: _, ...rest } = user;
        return {
            ...rest,
            achievements: JSON.parse(user.achievements || '[]'),
        };
    }
    async login(loginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        const passwordValid = user.password === ''
            ? true
            : await bcrypt.compare(loginDto.password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Email hoặc mật khẩu không đúng');
        }
        return {
            token: this.signToken(user.id, user.email),
            user: this.mapUser(user),
        };
    }
    async register(registerDto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });
        if (existing) {
            throw new common_1.ConflictException('Email đã được sử dụng');
        }
        const totalUsers = await this.prisma.user.count();
        const hashedPassword = await bcrypt.hash(registerDto.password || 'password123', 10);
        const userId = `user_${totalUsers + 1}`;
        const newUser = await this.prisma.user.create({
            data: {
                id: userId,
                email: registerDto.email,
                password: hashedPassword,
                name: registerDto.name,
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
                streak: 1,
                totalExpensesCount: 0,
                monthlyLimit: 20000000,
                daysUsingApp: 1,
                achievements: JSON.stringify(['First Snap']),
            },
        });
        await this.prisma.wallet.create({
            data: {
                id: `wal_${Date.now()}_default`,
                name: 'Ví Tiền Mặt',
                type: 'Cash',
                balance: 10000000,
                color: '#10b981',
                userId,
            },
        });
        return {
            token: this.signToken(newUser.id, newUser.email),
            user: this.mapUser(newUser),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map