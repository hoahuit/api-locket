import { ExpenseService } from './expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from './expense.dto';
export declare class ExpenseController {
    private readonly expenseService;
    constructor(expenseService: ExpenseService);
    findAll(req: any): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    create(req: any, createExpenseDto: CreateExpenseDto): Promise<{
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
    update(id: string, req: any, updateExpenseDto: UpdateExpenseDto): Promise<{
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
    remove(id: string, req: any): Promise<{
        success: boolean;
    }>;
}
