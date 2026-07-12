import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        title: string;
        body: string;
        read: boolean;
    }[]>;
    markAllAsRead(userId: string): Promise<{
        success: boolean;
    }>;
}
