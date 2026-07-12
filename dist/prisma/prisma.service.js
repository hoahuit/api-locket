"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
        await this.seedIfNeeded();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async seedIfNeeded() {
        try {
            const categoryCount = await this.category.count();
            if (categoryCount === 0) {
                console.log('Seeding initial categories...');
                const categories = [
                    { id: 'cat_1', name: 'Food', icon: 'Utensils', color: '#FF5733' },
                    { id: 'cat_2', name: 'Drink', icon: 'Coffee', color: '#FFB800' },
                    { id: 'cat_3', name: 'Transport', icon: 'Car', color: '#33C3FF' },
                    { id: 'cat_4', name: 'Shopping', icon: 'ShoppingBag', color: '#E033FF' },
                    { id: 'cat_5', name: 'Bills', icon: 'Receipt', color: '#33FF70' },
                    { id: 'cat_6', name: 'Health', icon: 'HeartPulse', color: '#FF3380' },
                    { id: 'cat_7', name: 'Entertainment', icon: 'Gamepad2', color: '#8033FF' },
                    { id: 'cat_8', name: 'Education', icon: 'GraduationCap', color: '#33FFA6' },
                    { id: 'cat_9', name: 'Travel', icon: 'Plane', color: '#FF8333' },
                    { id: 'cat_10', name: 'Others', icon: 'MoreHorizontal', color: '#999999' }
                ];
                for (const cat of categories) {
                    await this.category.create({ data: cat });
                }
            }
            const userCount = await this.user.count();
            if (userCount === 0) {
                console.log('Seeding initial mock user, wallets, and notifications...');
                await this.user.create({
                    data: {
                        id: 'user_1',
                        email: 'hello@locketspend.co',
                        password: '',
                        name: 'Alex Rivera',
                        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                        streak: 12,
                        totalExpensesCount: 42,
                        monthlyLimit: 2500,
                        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
                        daysUsingApp: 12,
                        achievements: JSON.stringify(['First Snap', 'Streak Master (10 Days)', 'Budget Saver', 'Category Explorer']),
                    },
                });
                const wallets = [
                    { id: 'wal_1', name: 'Main Account', type: 'Bank', balance: 4850.50, color: '#3b82f6', userId: 'user_1' },
                    { id: 'wal_2', name: 'Pocket Cash', type: 'Cash', balance: 180.00, color: '#10b981', userId: 'user_1' },
                    { id: 'wal_3', name: 'Gold Card', type: 'Credit Card', balance: -450.25, color: '#f59e0b', userId: 'user_1' },
                    { id: 'wal_4', name: 'PayPlus', type: 'E-Wallet', balance: 650.00, color: '#8b5cf6', userId: 'user_1' }
                ];
                for (const wal of wallets) {
                    await this.wallet.create({ data: wal });
                }
                const getPastDate = (daysAgo, hoursOffset = 0) => {
                    const d = new Date();
                    d.setDate(d.getDate() - daysAgo);
                    d.setHours(d.getHours() - hoursOffset);
                    return d;
                };
                const expenses = [
                    {
                        id: 'exp_1',
                        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
                        amount: 14.50,
                        note: 'Cozy morning flat white & croissant',
                        categoryId: 'cat_2',
                        userId: 'user_1',
                        createdAt: getPastDate(0, 2),
                        updatedAt: getPastDate(0, 2),
                        location: 'Third Wave Coffee Co.',
                        tags: JSON.stringify(['coffee', 'breakfast'])
                    },
                    {
                        id: 'exp_2',
                        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
                        amount: 32.00,
                        note: 'Pizza night with team at the office',
                        categoryId: 'cat_1',
                        userId: 'user_1',
                        createdAt: getPastDate(0, 6),
                        updatedAt: getPastDate(0, 6),
                        location: 'Margherita Pizzeria',
                        tags: JSON.stringify(['work', 'dinner'])
                    },
                    {
                        id: 'exp_3',
                        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
                        amount: 120.00,
                        note: 'Booking airport express train & luggage tag',
                        categoryId: 'cat_9',
                        userId: 'user_1',
                        createdAt: getPastDate(1, 4),
                        updatedAt: getPastDate(1, 4),
                        location: 'Central Station Terminal',
                        tags: JSON.stringify(['flight', 'commute'])
                    },
                    {
                        id: 'exp_4',
                        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
                        amount: 85.00,
                        note: 'New minimalist studio organizer basket',
                        categoryId: 'cat_4',
                        userId: 'user_1',
                        createdAt: getPastDate(2, 3),
                        updatedAt: getPastDate(2, 3),
                        location: 'MUJI Flagship Store',
                        tags: JSON.stringify(['setup', 'home'])
                    },
                    {
                        id: 'exp_5',
                        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
                        amount: 450.00,
                        note: 'Weekend resort booking deposit',
                        categoryId: 'cat_9',
                        userId: 'user_1',
                        createdAt: getPastDate(4, 5),
                        updatedAt: getPastDate(4, 5),
                        location: 'Coastal Palms Resort',
                        tags: JSON.stringify(['trip', 'weekend'])
                    },
                    {
                        id: 'exp_6',
                        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
                        amount: 22.50,
                        note: 'Organic harvest salad & detox juice',
                        categoryId: 'cat_1',
                        userId: 'user_1',
                        createdAt: getPastDate(5, 1),
                        updatedAt: getPastDate(5, 1),
                        location: 'Green & Lean Kitchen',
                        tags: JSON.stringify(['healthy', 'lunch'])
                    },
                    {
                        id: 'exp_7',
                        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
                        amount: 8.99,
                        note: 'Developer cloud plan subscription billing',
                        categoryId: 'cat_5',
                        userId: 'user_1',
                        createdAt: getPastDate(7, 2),
                        updatedAt: getPastDate(7, 2),
                        location: 'CloudVibe Hosting',
                        tags: JSON.stringify(['saas', 'monthly'])
                    }
                ];
                for (const exp of expenses) {
                    await this.expense.create({ data: exp });
                }
                const notifications = [
                    {
                        id: 'not_1',
                        title: 'Streak Active! ⚡',
                        body: 'You are on a 12-day streak. Capture an expense today to keep it burning!',
                        type: 'reminder',
                        read: false,
                        userId: 'user_1',
                        createdAt: getPastDate(0, 1)
                    },
                    {
                        id: 'not_2',
                        title: 'Weekly Summary Ready 📊',
                        body: 'Your spending was 18% lower than last week. Great job staying within budget!',
                        type: 'summary',
                        read: true,
                        userId: 'user_1',
                        createdAt: getPastDate(2, 8)
                    },
                    {
                        id: 'not_3',
                        title: 'Budget Warning ⚠️',
                        body: 'You have used 82% of your monthly Travel category limit.',
                        type: 'alert',
                        read: false,
                        userId: 'user_1',
                        createdAt: getPastDate(4, 12)
                    }
                ];
                for (const notif of notifications) {
                    await this.notification.create({ data: notif });
                }
                console.log('Database successfully seeded with initial mock data.');
            }
        }
        catch (error) {
            console.error('Error seeding database:', error);
        }
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map