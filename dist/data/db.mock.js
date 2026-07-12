"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDatabase = exports.MOCK_NOTIFICATIONS = exports.MOCK_EXPENSES = exports.MOCK_WALLETS = exports.MOCK_CATEGORIES = exports.MOCK_USERS = void 0;
exports.MOCK_USERS = [
    {
        id: 'user_1',
        email: 'hello@locketspend.co',
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        streak: 12,
        totalExpensesCount: 42,
        monthlyLimit: 2500,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        daysUsingApp: 12,
        achievements: ['First Snap', 'Streak Master (10 Days)', 'Budget Saver', 'Category Explorer']
    }
];
exports.MOCK_CATEGORIES = [
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
exports.MOCK_WALLETS = [
    { id: 'wal_1', name: 'Main Account', type: 'Bank', balance: 4850.50, color: '#3b82f6' },
    { id: 'wal_2', name: 'Pocket Cash', type: 'Cash', balance: 180.00, color: '#10b981' },
    { id: 'wal_3', name: 'Gold Card', type: 'Credit Card', balance: -450.25, color: '#f59e0b' },
    { id: 'wal_4', name: 'PayPlus', type: 'E-Wallet', balance: 650.00, color: '#8b5cf6' }
];
const today = new Date();
const getPastDate = (daysAgo, hoursOffset = 0) => {
    const d = new Date();
    d.setDate(today.getDate() - daysAgo);
    d.setHours(today.getHours() - hoursOffset);
    return d.toISOString();
};
exports.MOCK_EXPENSES = [
    {
        id: 'exp_1',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
        amount: 14.50,
        note: 'Cozy morning flat white & croissant',
        category: 'cat_2',
        wallet: 'wal_2',
        createdAt: getPastDate(0, 2),
        updatedAt: getPastDate(0, 2),
        location: 'Third Wave Coffee Co.',
        tags: ['coffee', 'breakfast']
    },
    {
        id: 'exp_2',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80',
        amount: 32.00,
        note: 'Pizza night with team at the office',
        category: 'cat_1',
        wallet: 'wal_1',
        createdAt: getPastDate(0, 6),
        updatedAt: getPastDate(0, 6),
        location: 'Margherita Pizzeria',
        tags: ['work', 'dinner']
    },
    {
        id: 'exp_3',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
        amount: 120.00,
        note: 'Booking airport express train & luggage tag',
        category: 'cat_9',
        wallet: 'wal_3',
        createdAt: getPastDate(1, 4),
        updatedAt: getPastDate(1, 4),
        location: 'Central Station Terminal',
        tags: ['flight', 'commute']
    },
    {
        id: 'exp_4',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
        amount: 85.00,
        note: 'New minimalist studio organizer basket',
        category: 'cat_4',
        wallet: 'wal_1',
        createdAt: getPastDate(2, 3),
        updatedAt: getPastDate(2, 3),
        location: 'MUJI Flagship Store',
        tags: ['setup', 'home']
    },
    {
        id: 'exp_5',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        amount: 450.00,
        note: 'Weekend resort booking deposit',
        category: 'cat_9',
        wallet: 'wal_3',
        createdAt: getPastDate(4, 5),
        updatedAt: getPastDate(4, 5),
        location: 'Coastal Palms Resort',
        tags: ['trip', 'weekend']
    },
    {
        id: 'exp_6',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
        amount: 22.50,
        note: 'Organic harvest salad & detox juice',
        category: 'cat_1',
        wallet: 'wal_4',
        createdAt: getPastDate(5, 1),
        updatedAt: getPastDate(5, 1),
        location: 'Green & Lean Kitchen',
        tags: ['healthy', 'lunch']
    },
    {
        id: 'exp_7',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
        amount: 8.99,
        note: 'Developer cloud plan subscription billing',
        category: 'cat_5',
        wallet: 'wal_1',
        createdAt: getPastDate(7, 2),
        updatedAt: getPastDate(7, 2),
        location: 'CloudVibe Hosting',
        tags: ['saas', 'monthly']
    }
];
exports.MOCK_NOTIFICATIONS = [
    {
        id: 'not_1',
        title: 'Streak Active! ⚡',
        body: 'You are on a 12-day streak. Capture an expense today to keep it burning!',
        type: 'reminder',
        read: false,
        createdAt: getPastDate(0, 1)
    },
    {
        id: 'not_2',
        title: 'Weekly Summary Ready 📊',
        body: 'Your spending was 18% lower than last week. Great job staying within budget!',
        type: 'summary',
        read: true,
        createdAt: getPastDate(2, 8)
    },
    {
        id: 'not_3',
        title: 'Budget Warning ⚠️',
        body: 'You have used 82% of your monthly Travel category limit.',
        type: 'alert',
        read: false,
        createdAt: getPastDate(4, 12)
    }
];
class MockDatabase {
    static getUser(id) {
        return this.users.find(u => u.id === id);
    }
    static updateUser(id, updates) {
        const idx = this.users.findIndex(u => u.id === id);
        if (idx !== -1) {
            this.users[idx] = { ...this.users[idx], ...updates };
            return this.users[idx];
        }
        throw new Error('User not found');
    }
    static getCategories() {
        return this.categories;
    }
    static addCategory(cat) {
        const newCat = {
            id: `cat_${this.categories.length + 1}`,
            ...cat
        };
        this.categories.push(newCat);
        return newCat;
    }
    static getWallets() {
        return this.wallets;
    }
    static addWallet(wal) {
        const newWal = {
            id: `wal_${this.wallets.length + 1}`,
            ...wal
        };
        this.wallets.push(newWal);
        return newWal;
    }
    static updateWallet(id, amountChange) {
        const wallet = this.wallets.find(w => w.id === id);
        if (wallet) {
            wallet.balance += amountChange;
        }
    }
    static getExpenses() {
        return this.expenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    static getExpense(id) {
        return this.expenses.find(e => e.id === id);
    }
    static addExpense(exp) {
        const newExp = {
            id: `exp_${this.expenses.length + 1}`,
            ...exp,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.expenses.push(newExp);
        this.updateWallet(exp.wallet, -exp.amount);
        const user = this.users[0];
        if (user) {
            user.totalExpensesCount += 1;
            user.streak += 1;
        }
        const totalSpentThisMonth = this.expenses
            .filter(e => {
            const date = new Date(e.createdAt);
            const now = new Date();
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        })
            .reduce((sum, e) => sum + e.amount, 0);
        if (user && totalSpentThisMonth > user.monthlyLimit) {
            this.notifications.unshift({
                id: `not_${this.notifications.length + 1}`,
                title: 'Monthly Budget Exceeded! 🚨',
                body: `You spent $${totalSpentThisMonth.toFixed(2)}, which exceeds your $${user.monthlyLimit} limit.`,
                type: 'alert',
                read: false,
                createdAt: new Date().toISOString()
            });
        }
        return newExp;
    }
    static deleteExpense(id) {
        const idx = this.expenses.findIndex(e => e.id === id);
        if (idx !== -1) {
            const exp = this.expenses[idx];
            this.updateWallet(exp.wallet, exp.amount);
            this.expenses.splice(idx, 1);
            const user = this.users[0];
            if (user && user.totalExpensesCount > 0) {
                user.totalExpensesCount -= 1;
            }
            return true;
        }
        return false;
    }
    static updateExpense(id, updates) {
        const idx = this.expenses.findIndex(e => e.id === id);
        if (idx !== -1) {
            const original = this.expenses[idx];
            if (updates.amount !== undefined || updates.wallet !== undefined) {
                const oldAmount = original.amount;
                const newAmount = updates.amount !== undefined ? updates.amount : oldAmount;
                const oldWalletId = original.wallet;
                const newWalletId = updates.wallet !== undefined ? updates.wallet : oldWalletId;
                if (oldWalletId === newWalletId) {
                    const diff = newAmount - oldAmount;
                    this.updateWallet(oldWalletId, -diff);
                }
                else {
                    this.updateWallet(oldWalletId, oldAmount);
                    this.updateWallet(newWalletId, -newAmount);
                }
            }
            this.expenses[idx] = {
                ...original,
                ...updates,
                updatedAt: new Date().toISOString()
            };
            return this.expenses[idx];
        }
        throw new Error('Expense not found');
    }
    static getNotifications() {
        return this.notifications;
    }
    static markNotificationsRead() {
        this.notifications.forEach(n => n.read = true);
    }
}
exports.MockDatabase = MockDatabase;
MockDatabase.users = [...exports.MOCK_USERS];
MockDatabase.categories = [...exports.MOCK_CATEGORIES];
MockDatabase.wallets = [...exports.MOCK_WALLETS];
MockDatabase.expenses = [...exports.MOCK_EXPENSES];
MockDatabase.notifications = [...exports.MOCK_NOTIFICATIONS];
//# sourceMappingURL=db.mock.js.map