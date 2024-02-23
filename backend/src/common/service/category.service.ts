
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/admin/schema/category.schema';

@Injectable()
export class CategoryService {

    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>
    ) { }

    async fetchCategories() {
        const catrgoryData = await this.categoryModel.find({})
        return catrgoryData
    }

    async fetchActiveCategories() {
        const categories = await this.categoryModel.find({ status: true })

        console.log(categories)

        if (!categories) throw new NotFoundException('')
        return categories
    }

    async addCategory(data) {
        await this.categoryModel.create({
            categoryName: data.category,
            status: true
        })

        return {
            status: true
        }

    }


}
