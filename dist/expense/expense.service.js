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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExpenseService = class ExpenseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapExpense(exp) {
        return {
            id: exp.id,
            image: exp.image,
            amount: exp.amount,
            note: exp.note,
            category: exp.categoryId,
            wallet: '',
            userId: exp.userId,
            createdAt: exp.createdAt.toISOString(),
            updatedAt: exp.updatedAt.toISOString(),
            location: exp.location || '',
            tags: exp.tags ? JSON.parse(exp.tags) : [],
        };
    }
    async findAll(userId) {
        const expenses = await this.prisma.expense.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        return expenses.map(e => this.mapExpense(e));
    }
    async findOne(id, userId) {
        const expense = await this.prisma.expense.findUnique({ where: { id } });
        if (!expense)
            throw new common_1.NotFoundException(`Expense ${id} not found`);
        if (expense.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.mapExpense(expense);
    }
    async create(userId, createExpenseDto) {
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
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (user) {
            await this.prisma.user.update({
                where: { id: userId },
                data: { totalExpensesCount: { increment: 1 }, streak: { increment: 1 } },
            });
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
    async update(id, userId, updateExpenseDto) {
        const original = await this.prisma.expense.findUnique({ where: { id } });
        if (!original)
            throw new common_1.NotFoundException(`Expense ${id} not found`);
        if (original.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
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
    async remove(id, userId) {
        const original = await this.prisma.expense.findUnique({ where: { id } });
        if (!original)
            throw new common_1.NotFoundException(`Expense ${id} not found`);
        if (original.userId !== userId)
            throw new common_1.ForbiddenException('Access denied');
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
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map