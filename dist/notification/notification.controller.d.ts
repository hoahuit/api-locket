import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    findAll(req: any): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        userId: string;
        title: string;
        body: string;
        read: boolean;
    }[]>;
    markAllAsRead(req: any): Promise<{
        success: boolean;
    }>;
}
