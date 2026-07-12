import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
export declare class ExpenseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private mapExpense;
    findAll(userId: string): Promise<{
        id: any;
        image: any;
        amount: any;
        note: any;
        category: any;
        wallet: string;
        userId: any;
        createdAt: any;
        updatedAt: any;
        location: any;
        tags: any;
    }[]>;
    findOne(id: string, userId: string): Promise<{
        id: any;
        image: any;
        amount: any;
        note: any;
        category: any;
        wallet: string;
        userId: any;
        createdAt: any;
        updatedAt: any;
        location: any;
        tags: any;
    }>;
    create(userId: string, createExpenseDto: CreateExpenseDto): Promise<{
        id: any;
        image: any;
        amount: any;
        note: any;
        category: any;
        wallet: string;
        userId: any;
        createdAt: any;
        updatedAt: any;
        location: any;
        tags: any;
    }>;
    update(id: string, userId: string, updateExpenseDto: UpdateExpenseDto): Promise<{
        id: any;
        image: any;
        amount: any;
        note: any;
        category: any;
        wallet: string;
        userId: any;
        createdAt: any;
        updatedAt: any;
        location: any;
        tags: any;
    }>;
    remove(id: string, userId: string): Promise<{
        success: boolean;
    }>;
}
