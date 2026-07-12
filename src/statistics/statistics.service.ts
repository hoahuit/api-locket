import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatistics(userId: string) {
    const dbExpenses = await this.prisma.expense.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    const wallets = await this.prisma.wallet.findMany({ where: { userId } });
    const categories = await this.prisma.category.findMany();
    const dbUser = await this.prisma.user.findUnique({ where: { id: userId } });

    const expenses = dbExpenses.map(exp => ({
      id: exp.id,
      image: exp.image,
      amount: exp.amount,
      note: exp.note,
      category: exp.categoryId,
      wallet: '',
      createdAt: exp.createdAt.toISOString(),
      updatedAt: exp.updatedAt.toISOString(),
      location: exp.location || '',
      tags: exp.tags ? JSON.parse(exp.tags) : [],
    }));

    const user = dbUser
      ? { ...dbUser, createdAt: dbUser.createdAt.toISOString(), achievements: JSON.parse(dbUser.achievements) }
      : undefined;

    if (expenses.length === 0) {
      return {
        totalSpending: 0,
        averageSpending: 0,
        highestExpense: 0,
        lowestExpense: 0,
        categoryBreakdown: [],
        walletBreakdown: [],
        budgetRemaining: user ? user.monthlyLimit : 0,
        monthlyComparison: { changePercent: 0, direction: 'flat' },
        charts: { pie: [], line: [], bar: [], area: [] },
      };
    }

    const totalSpending = expenses.reduce((sum, e) => sum + e.amount, 0);
    const averageSpending = totalSpending / expenses.length;
    const highestExpense = Math.max(...expenses.map(e => e.amount));
    const lowestExpense = Math.min(...expenses.map(e => e.amount));

    // Category Breakdown
    const categoryTotals: { [id: string]: number } = {};
    expenses.forEach(e => { categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount; });
    const categoryBreakdown = Object.keys(categoryTotals).map(catId => {
      const cat = categories.find(c => c.id === catId);
      return { id: catId, name: cat?.name ?? 'Unknown', value: categoryTotals[catId], color: cat?.color ?? '#cccccc' };
    });

    // Wallet Breakdown (removed wallet mapping, return empty)
    const walletBreakdown = [];

    // Budget
    const now = new Date();
    const currentMonthExpenses = expenses.filter(e => {
      const d = new Date(e.createdAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const monthlySpending = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const budgetRemaining = Math.max(0, (user?.monthlyLimit ?? 2000) - monthlySpending);

    // Monthly comparison
    const lastMonthExpenses = expenses.filter(e => {
      const d = new Date(e.createdAt);
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
      return d.getMonth() === lastMonth && d.getFullYear() === year;
    });
    const lastMonthSpending = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    let changePercent = 0;
    let direction = 'flat';
    if (lastMonthSpending > 0) {
      changePercent = ((monthlySpending - lastMonthSpending) / lastMonthSpending) * 100;
      direction = changePercent > 0 ? 'up' : 'down';
    } else if (monthlySpending > 0) {
      changePercent = 100;
      direction = 'up';
    }

    // 7-day trend
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - i);
      return d.toLocaleDateString('en-US', { weekday: 'short' });
    }).reverse();

    const dailySpending: { [day: string]: number } = {};
    last7Days.forEach(day => { dailySpending[day] = 0; });
    expenses.forEach(e => {
      const dayName = new Date(e.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
      if (dailySpending[dayName] !== undefined) dailySpending[dayName] += e.amount;
    });
    const trendData = last7Days.map(day => ({ name: day, amount: dailySpending[day] }));

    return {
      totalSpending, averageSpending, highestExpense, lowestExpense,
      categoryBreakdown, walletBreakdown, budgetRemaining,
      monthlyComparison: { changePercent: Math.abs(parseFloat(changePercent.toFixed(1))), direction },
      charts: { pie: categoryBreakdown, line: trendData, bar: walletBreakdown, area: trendData },
    };
  }
}
