import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  private mapUser(user: any) {
    const { password: _, ...rest } = user;
    return { ...rest, achievements: JSON.parse(user.achievements || '[]') };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User profile not found');
    return this.mapUser(user);
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          name: updateProfileDto.name,
          monthlyLimit: updateProfileDto.monthlyLimit,
          avatar: updateProfileDto.avatar,
        },
      });
      return this.mapUser(user);
    } catch {
      throw new NotFoundException('User profile not found');
    }
  }
}
