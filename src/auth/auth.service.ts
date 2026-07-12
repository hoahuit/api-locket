import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private signToken(userId: string, email: string): string {
    return this.jwtService.sign({ sub: userId, email });
  }

  private mapUser(user: any) {
    const { password: _, ...rest } = user;
    return {
      ...rest,
      achievements: JSON.parse(user.achievements || '[]'),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    // Check password (support empty password for seeded demo accounts)
    const passwordValid =
      user.password === ''
        ? true
        : await bcrypt.compare(loginDto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    return {
      token: this.signToken(user.id, user.email),
      user: this.mapUser(user),
    };
  }

  async register(registerDto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existing) {
      throw new ConflictException('Email đã được sử dụng');
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
        monthlyLimit: 20000000, // 20 million VND limit
        daysUsingApp: 1,
        achievements: JSON.stringify(['First Snap']),
      },
    });

    // Create a default wallet for the new user
    await this.prisma.wallet.create({
      data: {
        id: `wal_${Date.now()}_default`,
        name: 'Ví Tiền Mặt',
        type: 'Cash',
        balance: 10000000, // 10 million VND
        color: '#10b981',
        userId,
      },
    });

    return {
      token: this.signToken(newUser.id, newUser.email),
      user: this.mapUser(newUser),
    };
  }
}
