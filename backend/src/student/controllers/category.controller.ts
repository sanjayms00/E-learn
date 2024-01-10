import { Controller, Get } from '@nestjs/common';
import { CategoryService } from 'src/common/service/category.service';

@Controller('categories')
export class CategoryController {
    
    constructor(
        private readonly categoryService: CategoryService
    ){}


    @Get('all')
    getAllCategories(){
        return this.categoryService.fetchActiveCategories()
    }
}
