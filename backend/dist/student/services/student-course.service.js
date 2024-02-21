"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentCourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("../../admin/schema/category.schema");
const signed_url_service_1 = require("../../common/service/signed-url.service");
const course_schema_1 = require("../../instructor/schema/course.schema");
const instructor_schema_1 = require("../../instructor/schema/instructor.schema");
const student_schema_1 = require("../schema/student.schema");
const stripe_1 = __importDefault(require("stripe"));
const review_rating_service_1 = require("./review-rating.service");
const ratingReview_schema_1 = require("../schema/ratingReview.schema");
let StudentCourseService = class StudentCourseService {
    constructor(courseModel, instructorModel, categoryModel, studentModel, ratingReviewModel, reviewRatingService, signedUrlService) {
        this.courseModel = courseModel;
        this.instructorModel = instructorModel;
        this.categoryModel = categoryModel;
        this.studentModel = studentModel;
        this.ratingReviewModel = ratingReviewModel;
        this.reviewRatingService = reviewRatingService;
        this.signedUrlService = signedUrlService;
        this.stripeClient = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
    }
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
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail);
                return item;
            }));
            return courseWithPresignedUrls;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async home() {
        try {
            const courses = await this.homeCourses();
            const allCounts = await this.homeAllCounts();
            return {
                courses,
                allCounts
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
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
                    $limit: 9
                }
            ]);
            const courseWithPresignedUrls = await Promise.all(courses.map(async (item) => {
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail);
                return item;
            }));
            return courseWithPresignedUrls;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async homeAllCounts() {
        try {
            const courseCount = await this.courseModel.estimatedDocumentCount();
            const categoryCount = await this.categoryModel.estimatedDocumentCount();
            const ratingCount = await this.ratingReviewModel.estimatedDocumentCount();
            const instructorCount = await this.instructorModel.estimatedDocumentCount();
            const studentCount = await this.studentModel.estimatedDocumentCount();
            return {
                courseCount,
                categoryCount,
                ratingCount,
                instructorCount,
                studentCount
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
    }
    async searchCourse(searchText) {
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
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail);
                return item;
            }));
            return courseWithPresignedUrls;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async courseDetails(courseId) {
        try {
            if (!courseId || courseId.length !== 24) {
                throw new common_1.NotFoundException("id is not found");
            }
            const objcourseId = new mongoose_2.Types.ObjectId(courseId);
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
                throw new common_1.NotFoundException('Course not found');
            }
            courses[0].signedUrl = await this.signedUrlService.generateSignedUrl(courses[0].thumbnail);
            courses[0].signedTrailerUrl = await this.signedUrlService.generateSignedUrl(courses[0].trailer);
            let ratingreview = [];
            if (courses[0].reviews && courses[0].reviews.length > 0) {
                ratingreview = await this.reviewRatingService.getReviewsForDetailpage(courseId);
            }
            return {
                ...courses[0],
                ratingreview
            };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getInstructors() {
        const instructors = await this.instructorModel.find({}, { _id: 1, fullName: 1 });
        if (instructors.length < 1) {
            throw new common_1.NotFoundException("No instructors found");
        }
        return instructors;
    }
    async getCategories() {
        const categories = await this.categoryModel.find({}, { _id: 1, categoryName: 1 });
        if (categories.length < 1) {
            throw new common_1.NotFoundException("No categories found");
        }
        return categories;
    }
    async getFilteredCourses(filterData) {
        console.log(filterData);
        const matchData = [];
        if (filterData.level !== '') {
            matchData.push({ courseLevel: { $in: [filterData.level] } });
        }
        if (filterData.instructor !== '') {
            matchData.push({ instructorId: new mongoose_2.Types.ObjectId(filterData.instructor) });
        }
        if (filterData.category !== '') {
            matchData.push({ categoryId: new mongoose_2.Types.ObjectId(filterData.category) });
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
        const courseWithPresignedUrls = await Promise.all(filterDataResult.map(async (item) => {
            item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail);
            return item;
        }));
        return courseWithPresignedUrls;
    }
    async checkout(courseData, studentId) {
        const studentData = await this.studentModel.findOne({ _id: new mongoose_2.Types.ObjectId(studentId) }, { password: 0 });
        console.log("Id", courseData.course._id, studentId);
        const coursePrice = Number(courseData.course.price);
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
                success_url: `/success`,
                cancel_url: `/cancel`,
                metadata: {
                    studentId: JSON.stringify(studentId),
                    courseId: courseData.course._id
                },
            });
            return session;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
    async paymentSuccessService(paymentIntentId, studentId, courseId) {
        try {
            const courseExists = await this.studentModel.exists({
                _id: studentId,
                'courses': {
                    $elemMatch: {
                        'courseId': new mongoose_2.Types.ObjectId(courseId)
                    }
                }
            });
            if (!courseExists) {
                await this.courseModel.updateOne({ _id: courseId }, {
                    $push: {
                        students: new mongoose_2.Types.ObjectId(studentId)
                    }
                });
                await this.studentModel.updateOne({ _id: studentId }, {
                    $addToSet: {
                        courses: {
                            $each: [{
                                    courseId: new mongoose_2.Types.ObjectId(courseId),
                                    progress: 0,
                                }],
                        }
                    }
                });
            }
            else {
                throw new common_1.HttpException('course alredy purchased', common_1.HttpStatus.CONFLICT);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.StudentCourseService = StudentCourseService;
exports.StudentCourseService = StudentCourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __param(2, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(3, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(4, (0, mongoose_1.InjectModel)(ratingReview_schema_1.RatingReview.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        review_rating_service_1.ReviewRatingService,
        signed_url_service_1.SignedUrlService])
], StudentCourseService);
//# sourceMappingURL=student-course.service.js.map