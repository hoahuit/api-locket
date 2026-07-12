export declare class CreateExpenseDto {
    image: string;
    amount: number;
    note?: string;
    category: string;
    location?: string;
    tags?: string[];
}
export declare class UpdateExpenseDto {
    image?: string;
    amount?: number;
    note?: string;
    category?: string;
    location?: string;
    tags?: string[];
}
