export interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    streak: number;
    totalExpensesCount: number;
    monthlyLimit: number;
    createdAt: string;
    daysUsingApp: number;
    achievements: string[];
}
export interface Category {
    id: string;
    name: string;
    icon: string;
    color: string;
    isCustom?: boolean;
}
export interface Wallet {
    id: string;
    name: string;
    type: string;
    balance: number;
    color: string;
}
export interface Expense {
    id: string;
    image: string;
    amount: number;
    note: string;
    category: string;
    wallet: string;
    createdAt: string;
    updatedAt: string;
    location?: string;
    tags?: string[];
}
export interface Notification {
    id: string;
    title: string;
    body: string;
    type: 'alert' | 'reminder' | 'summary';
    read: boolean;
    createdAt: string;
}
export declare const MOCK_USERS: User[];
export declare const MOCK_CATEGORIES: Category[];
export declare const MOCK_WALLETS: Wallet[];
export declare const MOCK_EXPENSES: Expense[];
export declare const MOCK_NOTIFICATIONS: Notification[];
export declare class MockDatabase {
    static users: User[];
    static categories: Category[];
    static wallets: Wallet[];
    static expenses: Expense[];
    static notifications: Notification[];
    static getUser(id: string): User | undefined;
    static updateUser(id: string, updates: Partial<User>): User;
    static getCategories(): Category[];
    static addCategory(cat: Omit<Category, 'id'>): Category;
    static getWallets(): Wallet[];
    static addWallet(wal: Omit<Wallet, 'id'>): Wallet;
    static updateWallet(id: string, amountChange: number): void;
    static getExpenses(): Expense[];
    static getExpense(id: string): Expense | undefined;
    static addExpense(exp: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>): Expense;
    static deleteExpense(id: string): boolean;
    static updateExpense(id: string, updates: Partial<Expense>): Expense;
    static getNotifications(): Notification[];
    static markNotificationsRead(): void;
}
