
import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import { Category } from 'src/admin/schema/category.schema';
import { SignedUrlService } from 'src/common/service/signed-url.service';
import { Course } from 'src/instructor/schema/course.schema';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Student } from 'src/student/schema/student.schema';

import Stripe from "stripe";
import { ReviewRatingService } from './review-rating.service';
import { RatingReview } from '../schema/ratingReview.schema';

@Injectable()
export class StudentCourseService {

    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

    constructor(
        @InjectModel(Course.name)
        private readonly courseModel: Model<Course>,
        @InjectModel(Instructor.name)
        private readonly instructorModel: Model<Instructor>,
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>,
        @InjectModel(Student.name)
        private readonly studentModel: Model<Student>,
        @InjectModel(RatingReview.name)
        private readonly ratingReviewModel: Model<RatingReview>,
        private reviewRatingService: ReviewRatingService,
        private signedUrlService: SignedUrlService

    ) { }


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
                    $lookup: {
                        from: 'categories',
                        localField: 'categoryId',
                        foreignField: '_id',
                        as: 'categoryData',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        courseName: 1,
                        price: 1,
                        estimatedPrice: 1,
                        students: 1,
                        description: 1,
                        coursetags: 1,
                        videos: 1,
                        courseLevel: 1,
                        reviews: 1,
                        thumbnail: 1,
                        updatedAt: 1,
                        instructorName: { $arrayElemAt: ['$instructor.fullName', 0] },
                        categoryName: { $arrayElemAt: ['$categoryData.categoryName', 0] },
                    },
                }
            ]);

            const courseWithPresignedUrls = await Promise.all(courses.map(async (item) => {
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail)
                return item
            }));

            return courseWithPresignedUrls

        } catch (error) {
            throw new Error(error);
        }
    }

    //get limited courses for home
    async home() {
        try {
            const courses = await this.homeCourses()

            const allCounts = await this.homeAllCounts()

            return {
                courses,
                allCounts
            }
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    //home courses
    async homeCourses() {
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
                    $lookup: {
                        from: 'categories',
                        localField: 'categoryId',
                        foreignField: '_id',
                        as: 'categoryData',
                    },
                },
                {
                    $project: {
                        _id: 1,
                        courseName: 1,
                        price: 1,
                        estimatedPrice: 1,
                        students: 1,
                        description: 1,
                        coursetags: 1,
                        videos: 1,
                        courseLevel: 1,
                        reviews: 1,
                        thumbnail: 1,
                        updatedAt: 1,
                        instructorName: { $arrayElemAt: ['$instructor.fullName', 0] },
                        categoryName: { $arrayElemAt: ['$categoryData.categoryName', 0] },
                    },
                },
                {
                    $sort: { updatedAt: -1 }
                },
                {
                    $limit: 9
                }
            ]);

            const courseWithPresignedUrls = await Promise.all(courses.map(async (item) => {
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail)
                return item
            }));

            return courseWithPresignedUrls
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    //counts of all course and instructctors etc...
    async homeAllCounts() {
        try {
            //course count
            const courseCount = await this.courseModel.estimatedDocumentCount()

            //category count
            const categoryCount = await this.categoryModel.estimatedDocumentCount()

            //Ratings count
            const ratingCount = await this.ratingReviewModel.estimatedDocumentCount()

            //instructor count
            const instructorCount = await this.instructorModel.estimatedDocumentCount()

            //student count
            const studentCount = await this.studentModel.estimatedDocumentCount()

            return {
                courseCount,
                categoryCount,
                ratingCount,
                instructorCount,
                studentCount
            }

        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    //get searched courses
    async searchCourse(searchText: string) {
        try {
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

            const courseWithPresignedUrls = await Promise.all(result.map(async (item) => {
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail)
                return item
            }));

            return courseWithPresignedUrls
        } catch (error) {
            throw new Error(error)
        }

    }

    //get course details
    async courseDetails(courseId: string) {
        try {
            if (!courseId || courseId.length !== 24) {
                throw new NotFoundException("id is not found")
            }

            const objcourseId = new Types.ObjectId(courseId)

            const courses = await this.courseModel.aggregate([
                {
                    $match: { _id: objcourseId }
                },
                {
                    $lookup: {
                        from: 'instructors',
                        localField: 'instructorId',
                        foreignField: '_id',
                        as: 'instructorData',
                    },
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'categoryId',
                        foreignField: '_id',
                        as: 'categoryData',
                    },
                },
                {
                    $lookup: {
                        from: 'videos',
                        localField: 'videos',
                        foreignField: '_id',
                        as: 'videoData',
                    },
                },
                {
                    $project: {
                        "instructorName": { $arrayElemAt: ['$instructorData.fullName', 0] },
                        "categoryName": { $arrayElemAt: ['$categoryData.categoryName', 0] },
                        "videoData.title": 1,
                        "videoData.description": 1,
                        "_id": 1,
                        "courseName": 1,
                        "description": 1,
                        "price": 1,
                        "students": 1,
                        "thumbnail": 1,
                        "trailer": 1,
                        "courseTags": 1,
                        "content": 1,
                        "videos": 1,
                        "courseLevel": 1,
                        "reviews": 1,
                        "createdAt": 1,
                        "updatedAt": 1,
                    }
                }
            ]);

            if (courses.length < 1) {
                throw new NotFoundException('Course not found');
            }

            courses[0].signedUrl = await this.signedUrlService.generateSignedUrl(courses[0].thumbnail)
            courses[0].signedTrailerUrl = await this.signedUrlService.generateSignedUrl(courses[0].trailer)

            let ratingreview = []
            // check reviews if reviews get reviews
            if (courses[0].reviews && courses[0].reviews.length > 0) {
                // get reviews 
                ratingreview = await this.reviewRatingService.getReviewsForDetailpage(courseId)
            }

            return {
                ...courses[0],
                ratingreview
            }

        } catch (error) {
            throw new Error(error);
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
                    students: 1,
                    reviews: 1,
                    description: 1,
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

        const courseWithPresignedUrls = await Promise.all(filterDataResult.map(async (item) => {
            item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail)
            return item
        }));

        return courseWithPresignedUrls
    }

    //checkout
    async checkout(courseData, studentId) {

        //get studentData
        const studentData = await this.studentModel.findOne({ _id: new Types.ObjectId(studentId) }, { password: 0 })

        console.log("Id", courseData.course._id, studentId)   //Id 65a779ed21a1b6d99c1afe58 new ObjectId('6

        const coursePrice = Number(courseData.course.price)

        try {
            const customer = await this.stripeClient.customers.create({
                name: 'Jenny Rosen',
                address: {
                    line1: '510 Townsend St',
                    postal_code: '98140',
                    city: 'San Francisco',
                    state: 'CA',
                    country: 'US',
                },
            });

            await this.stripeClient.paymentIntents.create({
                amount: coursePrice * 100,
                currency: 'inr',
                description: 'Software development services',
                customer: customer.id,
            });

            //create a session send back to the client
            const session = await this.stripeClient.checkout.sessions.create({
                payment_method_types: ['card'],
                customer: customer.id,
                billing_address_collection: 'required',
                line_items: [
                    {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: courseData.course.courseName,
                            },
                            unit_amount: coursePrice * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `https://sanjayms.online/success`,
                // success_url: `/success`,
                cancel_url: `https://sanjayms.online/cancel`,
                // cancel_url: `/cancel`,
                metadata: {
                    studentId: JSON.stringify(studentId),
                    courseId: courseData.course._id
                },
            });
            // return session created
            return session
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    //after payment save course
    async paymentSuccessService(paymentIntentId, studentId, courseId) {
        // console.log("success service", paymentIntentId, studentId, courseId)
        try {
            const courseExists = await this.studentModel.exists({
                _id: studentId,
                'courses': {
                    $elemMatch: {
                        'courseId': new Types.ObjectId(courseId)
                    }
                }
            });

            if (!courseExists) {
                await this.courseModel.updateOne(
                    { _id: courseId },
                    {
                        $push: {
                            students: new Types.ObjectId(studentId)
                        }
                    }
                );
                await this.studentModel.updateOne(
                    { _id: studentId },
                    {
                        $addToSet: {
                            courses: {
                                $each: [{
                                    courseId: new Types.ObjectId(courseId),
                                    progress: 0,
                                }],
                            }
                        }
                    }
                );
            } else {
                throw new HttpException('course alredy purchased', HttpStatus.CONFLICT);
            }

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    ////////////////////////////////// method  ends //////////////////////////

}
