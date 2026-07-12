import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    return this.prisma.category.findMany();
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const totalCategories = await this.prisma.category.count();
    return this.prisma.category.create({
      data: {
        id: `cat_${totalCategories + 1}`,
        name: createCategoryDto.name,
        icon: createCategoryDto.icon,
        color: createCategoryDto.color,
        isCustom: true,
      }
    });
  }
}
