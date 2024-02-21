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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRatingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const ratingReview_schema_1 = require("../schema/ratingReview.schema");
const course_schema_1 = require("../../instructor/schema/course.schema");
const learning_service_1 = require("./learning.service");
let ReviewRatingService = class ReviewRatingService {
    constructor(ratingReviewModel, courseModel, learningService) {
        this.ratingReviewModel = ratingReviewModel;
        this.courseModel = courseModel;
        this.learningService = learningService;
    }
    async reviewAndRateCourse(data, studentId) {
        try {
            const { courseId, rating, review } = data;
            const objStudentId = new mongoose_2.Types.ObjectId(studentId);
            const objCourseId = new mongoose_2.Types.ObjectId(courseId);
            const checkReviewAdded = await this.courseModel.findOne({
                _id: objCourseId, "reviews.studentId": objStudentId
            });
            if (checkReviewAdded)
                throw new common_1.ConflictException('Review already added');
            const findReview = await this.ratingReviewModel.findOne({ courseId: objCourseId, studentId: objStudentId });
            if (findReview)
                throw new common_1.ConflictException("Review Already added");
            const result = await this.ratingReviewModel.create({
                courseId: objCourseId,
                studentId: objStudentId,
                rating: rating,
                review: review
            });
            if (!result)
                throw new Error("Unable to save the data");
            const courseUpdate = await this.courseModel.updateOne({ _id: objCourseId }, {
                $addToSet: {
                    reviews: {
                        studentId: objStudentId,
                        reviewId: result._id
                    }
                }
            });
            if (!courseUpdate) {
                throw new Error("Unable to update the courseModel");
            }
            return this.learningService.getMyCourses(studentId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getReviewsForDetailpage(courseId) {
        try {
            const objCourseId = new mongoose_2.Types.ObjectId(courseId);
            const reviewData = await this.courseModel.aggregate([
                {
                    $match: {
                        _id: objCourseId
                    }
                },
                {
                    $lookup: {
                        from: "ratingreviews",
                        localField: "reviews.reviewId",
                        foreignField: "_id",
                        as: "reviewData"
                    }
                },
                {
                    $unwind: "$reviewData"
                },
                {
                    $lookup: {
                        from: "students",
                        localField: "reviewData.studentId",
                        foreignField: "_id",
                        as: "reviewData.student"
                    }
                },
                {
                    $project: {
                        "reviewData._id": 1,
                        "reviewData.studentId": 1,
                        "reviewData.createdAt": 1,
                        "reviewData.rating": 1,
                        "reviewData.review": 1,
                        "reviewData.student": { $arrayElemAt: ['$reviewData.student.fullName', 0] },
                    }
                }
            ]);
            console.log(reviewData);
            if (!reviewData || reviewData.length < 1) {
                throw new common_1.NotFoundException("reviews not found");
            }
            return reviewData;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ReviewRatingService = ReviewRatingService;
exports.ReviewRatingService = ReviewRatingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ratingReview_schema_1.RatingReview.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        learning_service_1.LearningService])
], ReviewRatingService);
//# sourceMappingURL=review-rating.service.js.map