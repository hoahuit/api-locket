import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getStatistics(req: any): Promise<{
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
