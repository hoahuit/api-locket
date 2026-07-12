import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './user.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private mapUser;
    getProfile(userId: string): Promise<any>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<any>;
}
