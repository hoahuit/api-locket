import { PrismaService } from '../prisma/prisma.service';
export declare class StatisticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStatistics(userId: string): Promise<{
        totalSpending: number;
        averageSpending: number;
        highestExpense: number;
        lowestExpense: number;
        categoryBreakdown: {
            id: string;
            name: string;
            value: number;
            color: string;
        }[];
        walletBreakdown: any[];
        budgetRemaining: number;
        monthlyComparison: {
            changePercent: number;
            direction: string;
        };
        charts: {
            pie: {
                id: string;
                name: string;
                value: number;
                color: string;
            }[];
            line: {
                name: string;
                amount: number;
            }[];
            bar: any[];
            area: {
                name: string;
                amount: number;
            }[];
        };
    }>;
}
