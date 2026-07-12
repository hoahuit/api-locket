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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StatisticsService = class StatisticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStatistics(userId) {
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
        const categoryTotals = {};
        expenses.forEach(e => { categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount; });
        const categoryBreakdown = Object.keys(categoryTotals).map(catId => {
            const cat = categories.find(c => c.id === catId);
            return { id: catId, name: cat?.name ?? 'Unknown', value: categoryTotals[catId], color: cat?.color ?? '#cccccc' };
        });
        const walletBreakdown = [];
        const now = new Date();
        const currentMonthExpenses = expenses.filter(e => {
            const d = new Date(e.createdAt);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        });
        const monthlySpending = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
        const budgetRemaining = Math.max(0, (user?.monthlyLimit ?? 2000) - monthlySpending);
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
        }
        else if (monthlySpending > 0) {
            changePercent = 100;
            direction = 'up';
        }
        const last7Days = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(now.getDate() - i);
            return d.toLocaleDateString('en-US', { weekday: 'short' });
        }).reverse();
        const dailySpending = {};
        last7Days.forEach(day => { dailySpending[day] = 0; });
        expenses.forEach(e => {
            const dayName = new Date(e.createdAt).toLocaleDateString('en-US', { weekday: 'short' });
            if (dailySpending[dayName] !== undefined)
                dailySpending[dayName] += e.amount;
        });
        const trendData = last7Days.map(day => ({ name: day, amount: dailySpending[day] }));
        return {
            totalSpending, averageSpending, highestExpense, lowestExpense,
            categoryBreakdown, walletBreakdown, budgetRemaining,
            monthlyComparison: { changePercent: Math.abs(parseFloat(changePercent.toFixed(1))), direction },
            charts: { pie: categoryBreakdown, line: trendData, bar: walletBreakdown, area: trendData },
        };
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map