
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from 'src/admin/schema/category.schema';
import { Course } from 'src/instructor/schema/course.schema';

@Injectable()
export class CategoryService {

    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>,
        @InjectModel(Course.name)
        private readonly courseModel: Model<Course>,
    ) { }

    async fetchCategories() {
        const catrgoryData = await this.categoryModel.find({})
        return catrgoryData
    }

    async fetchActiveCategories() {
        const categories = await this.categoryModel.find({ status: true })

        if (!categories) throw new NotFoundException('')
        return categories
    }


    async addCategory(data) {

        try {
            const category = await this.categoryModel.findOne({
                categoryName: data.category
            })

            if (category) throw new Error("Category already exist")

            await this.categoryModel.create({
                categoryName: data.category,
                status: true
            })

            return await this.fetchCategories()
        } catch (error) {
            throw new Error(error)
        }

    }


    async removeCategory(categoryId) {

        try {
            const course = await this.courseModel.findOne(
                { categoryId: new Types.ObjectId(categoryId) }
            )

            if (course) {
                throw new Error("Category already in use, unable to delete")
            }

            await this.categoryModel.deleteOne({
                _id: new Types.ObjectId(categoryId),
            })

            return await this.fetchCategories()

        } catch (error) {
            throw new Error(error)
        }

    }


}
