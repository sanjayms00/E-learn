import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from 'src/admin/schema/category.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { Instructor } from 'src/instructor/schema/instructor.schema';

@Injectable()
export class StudentCourseService {

    constructor(
        @InjectModel(Course.name)
        private readonly courseModel: Model<Course>,
        @InjectModel(Instructor.name)
        private readonly instructorModel: Model<Instructor>,
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>
    ) { }

    async getAllCourse() {
        return await this.courseModel.find({}, { video: 0 })
    }

    async getLimitedCourse() {
        const courses = await this.courseModel.aggregate([
            {
                $lookup: {
                    from: 'instructors',
                    localField: 'instructorId',
                    foreignField: '_id',
                    as: 'instructor',
                },
            },
            {
                $project: {
                    _id: 1,
                    courseName: 1,
                    price: 1,
                    estimatedPrice: 1,
                    thumbnail: 1,
                    updatedAt: 1,
                    instructorName: { $arrayElemAt: ['$instructor.fullName', 0] },
                },
            },
            {
                $limit: 8
            }
        ])
        return courses
    }

    async searchCourse(searchText: string) {
        const regexPattern = new RegExp(searchText, 'i');
        return await this.courseModel.find({ courseName: { $regex: regexPattern } });
    }

    async courseDetails(id: string) {

        try {
            if (!id || id.length !== 24) {
                throw new NotFoundException("id is not found")
            }

            const objectId = new Types.ObjectId(id)

            const courses = await this.courseModel.aggregate([
                {
                    $match: { _id: objectId }
                },
                {
                    $lookup: {
                        from: 'instructors',
                        localField: 'instructorId',
                        foreignField: '_id',
                        as: 'instructor',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        courseName: 1,
                        price: 1,
                        description: 1,
                        estimatedPrice: 1,
                        thumbnail: 1,
                        updatedAt: 1,
                        instructorName: { $arrayElemAt: ['$instructor.fullName', 0] },
                    },
                }
            ]);

            if (courses.length < 1) {
                throw new NotFoundException('Course not found');
            }

            return courses[0];

        } catch (error) {
            console.log(error.message)
            throw new Error(error.message);
        }
    }

    async getInstructors() {
        const instructors = await this.instructorModel.find({}, { _id: 1, fullName: 1 })
        if (instructors.length < 1) {
            throw new NotFoundException("No instructors found")
        }
        return instructors
    }

    async getCategories() {
        const categories = await this.categoryModel.find({}, { _id: 1, categoryName: 1 })
        if (categories.length < 1) {
            throw new NotFoundException("No categories found")
        }
        return categories
    }

    async getFilteredCourses(filterData) {
        const filterDataResult = await this.courseModel.aggregate([
            {
                $lookup: {
                    from: 'instructors',
                    localField: 'instructorId',
                    foreignField: '_id',
                    as: 'instructor',
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categoryId',
                    foreignField: '_id',
                    as: 'category',
                },
            },
            {
                $project: {
                    _id: 1,
                    courseName: 1,
                    price: 1,
                    categoryId: 1,
                    instructorId: 1,
                    estimatedPrice: 1,
                    thumbnail: 1,
                    updatedAt: 1,
                    instructorName: { $arrayElemAt: ['$instructor.fullName', 0] },
                    categoryName: { $arrayElemAt: ['$category.categoryName', 0] },
                },
            },
            {
                $match: {
                    instructorId: new Types.ObjectId(filterData.instructor),
                    categoryId: new Types.ObjectId(filterData.category),
                }
            }
        ]);

        return filterDataResult


    }



}
