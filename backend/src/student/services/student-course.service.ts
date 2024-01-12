
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import { Category } from 'src/admin/schema/category.schema';
import { SignedUrlService } from 'src/common/service/signed-url.service';
import { Course } from 'src/instructor/schema/course.schema';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Student } from 'src/student/schema/student.schema';

@Injectable()
export class StudentCourseService {

    constructor(
        @InjectModel(Course.name)
        private readonly courseModel: Model<Course>,
        @InjectModel(Instructor.name)
        private readonly instructorModel: Model<Instructor>,
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>,
        @InjectModel(Student.name)
        private readonly studentModel: Model<Student>,
        private signedUrlService: SignedUrlService

    ) { }

    ////////////////////////////////// method  starts //////////////////////////

    //get all courses
    async getAllCourse() {

        try {
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
            ]);

            const signedCourses = await this.signedUrlService.generateSignedUrl(courses)

            console.log(signedCourses)
            return signedCourses

        } catch (error) {
            throw new Error(error.message);
        }

    }

    //get limited courses for home
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
        ]);

        const signedCourses = await this.signedUrlService.generateSignedUrl(courses)

        console.log(signedCourses)

        return signedCourses
    }

    //get searched courses
    async searchCourse(searchText: string) {
        const regexPattern = new RegExp(searchText, 'i');
        const result = await this.courseModel.aggregate([
            {
                $match: {
                    courseName: { $regex: regexPattern }
                }
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
                    estimatedPrice: 1,
                    thumbnail: 1,
                    updatedAt: 1,
                    instructorName: { $arrayElemAt: ['$instructor.fullName', 0] },
                },
            }
        ]);
        const signedCourses = await this.signedUrlService.generateSignedUrl(result)

        console.log(signedCourses)
        return signedCourses
    }

    //get course details
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

            const signedCourses = await this.signedUrlService.generateSignedUrl(courses)

            console.log(signedCourses)

            return signedCourses[0]

        } catch (error) {
            console.log(error.message)
            throw new Error(error.message);
        }
    }

    //get instructor
    async getInstructors() {
        const instructors = await this.instructorModel.find({}, { _id: 1, fullName: 1 })
        if (instructors.length < 1) {
            throw new NotFoundException("No instructors found")
        }
        return instructors
    }

    //get categories
    async getCategories() {
        const categories = await this.categoryModel.find({}, { _id: 1, categoryName: 1 })
        if (categories.length < 1) {
            throw new NotFoundException("No categories found")
        }
        return categories
    }

    //get filteredcourses
    async getFilteredCourses(filterData) {

        const matchData = []

        if (filterData.level !== '') {
            matchData.push({ courseLevel: { $in: [filterData.level] } });
        }
        if (filterData.instructor !== '') {
            matchData.push({ instructorId: new Types.ObjectId(filterData.instructor) });
        }
        if (filterData.category !== '') {
            matchData.push({ categoryId: new Types.ObjectId(filterData.category) });
        }
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
                    courseLevel: 1,
                    instructorName: { $arrayElemAt: ['$instructor.fullName', 0] },
                    categoryName: { $arrayElemAt: ['$category.categoryName', 0] },
                },
            },
            {
                $match: { $and: matchData }
            }
        ]);

        const signedCourses = await this.signedUrlService.generateSignedUrl(filterDataResult)

        console.log(signedCourses)
        return signedCourses


    }

    //checkout
    async checkout(courseData, studentId) {

        // const price = Number(courseData.course.price)
        console.log(studentId, courseData._id)
        try {
            const updateStudent = await this.studentModel.updateOne(
                {
                    _id: studentId
                },
                {
                    $addToSet: {
                        courses: {
                            $each: [{
                                courseId: new Types.ObjectId(courseData._id),
                                progress: 0,
                            }],
                        }
                    }
                }
            )
            console.log(updateStudent);

            return updateStudent
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    ////////////////////////////////// method  ends //////////////////////////

}
