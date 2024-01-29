import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from 'src/common/service/category.service';

@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Get('allCategories')
    getAllCategories() {
        return this.categoryService.fetchCategories()
    }


    @Get('activeCategories')
    getActiveCategories() {
        return this.categoryService.fetchActiveCategories()
    }

    @Post('addCategory')
    addCategory(@Body() data) {
        console.log(data)
        return this.categoryService.addCategory(data)
    }





}
