import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private readonly prisma: PrismaService) {}

  private mapExpense(exp: any) {
    return {
      id: exp.id,
      image: exp.image,
      amount: exp.amount,
      note: exp.note,
      category: exp.categoryId,
      wallet: '', // wallet column removed from Expense
      userId: exp.userId,
      createdAt: exp.createdAt.toISOString(),
      updatedAt: exp.updatedAt.toISOString(),
      location: exp.location || '',
      tags: exp.tags ? JSON.parse(exp.tags) : [],
    };
  }

  async findAll(userId: string) {
    const expenses = await this.prisma.expense.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return expenses.map(e => this.mapExpense(e));
  }

  async findOne(id: string, userId: string) {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException(`Expense ${id} not found`);
    if (expense.userId !== userId) throw new ForbiddenException('Access denied');
    return this.mapExpense(expense);
  }

  async create(userId: string, createExpenseDto: CreateExpenseDto) {
    const totalExpenses = await this.prisma.expense.count();
    const id = `exp_${Date.now()}_${totalExpenses + 1}`;

    const newExpense = await this.prisma.expense.create({
      data: {
        id,
        image: createExpenseDto.image,
        amount: createExpenseDto.amount,
        note: createExpenseDto.note || '',
        categoryId: createExpenseDto.category,
        userId,
        location: createExpenseDto.location || '',
        tags: JSON.stringify(createExpenseDto.tags || []),
      },
    });

    // Update user stats
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { totalExpensesCount: { increment: 1 }, streak: { increment: 1 } },
      });

      // Budget alert
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const result = await this.prisma.expense.aggregate({
        _sum: { amount: true },
        where: { userId, createdAt: { gte: startOfMonth } },
      });
      const spentAmount = result._sum.amount || 0;

      if (spentAmount > user.monthlyLimit) {
        const notifCount = await this.prisma.notification.count();
        await this.prisma.notification.create({
          data: {
            id: `not_${Date.now()}_${notifCount + 1}`,
            title: 'Vượt ngân sách tháng! 🚨',
            body: `Bạn đã chi ${spentAmount.toLocaleString('vi-VN')}VND, vượt giới hạn ${user.monthlyLimit.toLocaleString('vi-VN')}VND.`,
            type: 'alert',
            read: false,
            userId,
          },
        });
      }
    }

    return this.mapExpense(newExpense);
  }

  async update(id: string, userId: string, updateExpenseDto: UpdateExpenseDto) {
    const original = await this.prisma.expense.findUnique({ where: { id } });
    if (!original) throw new NotFoundException(`Expense ${id} not found`);
    if (original.userId !== userId) throw new ForbiddenException('Access denied');

    const updated = await this.prisma.expense.update({
      where: { id },
      data: {
        image: updateExpenseDto.image,
        amount: updateExpenseDto.amount,
        note: updateExpenseDto.note,
        categoryId: updateExpenseDto.category,
        location: updateExpenseDto.location,
        tags: updateExpenseDto.tags ? JSON.stringify(updateExpenseDto.tags) : undefined,
      },
    });

    return this.mapExpense(updated);
  }

  async remove(id: string, userId: string) {
    const original = await this.prisma.expense.findUnique({ where: { id } });
    if (!original) throw new NotFoundException(`Expense ${id} not found`);
    if (original.userId !== userId) throw new ForbiddenException('Access denied');

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (user && user.totalExpensesCount > 0) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { totalExpensesCount: { decrement: 1 } },
      });
    }

    await this.prisma.expense.delete({ where: { id } });
    return { success: true };
  }
}
