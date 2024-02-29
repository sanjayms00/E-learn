import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from 'src/common/service/category.service';

@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Get('allCategories')
    async getAllCategories() {
        return await this.categoryService.fetchCategories()
    }


    @Get('activeCategories')
    async getActiveCategories() {
        return await this.categoryService.fetchActiveCategories()
    }

    @Post('addCategory')
    async addCategory(@Body() data) {
        return await this.categoryService.addCategory(data)
    }

    @Delete('removeCategory/:categoryId')
    async removeCategory(
        @Param('categoryId') categoryId: string
    ) {
        return await this.categoryService.removeCategory(categoryId)
    }





}
