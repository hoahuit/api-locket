import { CategoryService } from './category.service';
import { CreateCategoryDto } from './category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
