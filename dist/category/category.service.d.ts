import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './category.dto';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getCategories(): Promise<{
        id: string;
        name: string;
        icon: string;
        color: string;
        isCustom: boolean;
    }[]>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        icon: string;
        color: string;
        isCustom: boolean;
    }>;
}
