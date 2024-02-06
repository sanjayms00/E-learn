import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RatingReview } from '../schema/ratingReview.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { LearningService } from './learning.service';

@Injectable()
export class ReviewRatingService {

    constructor(
        @InjectModel(RatingReview.name) private ratingReviewModel: Model<RatingReview>,
        @InjectModel(Course.name) private courseModel: Model<Course>,
        private learningService: LearningService
    ) { }

    async reviewAndRateCourse(data, studentId) {
        try {
            const { courseId, rating, review } = data

            const objStudentId = new Types.ObjectId(studentId)
            const objCourseId = new Types.ObjectId(courseId)

            //find the studentid present in the course review array
            const checkReviewAdded = await this.courseModel.findOne(
                {
                    _id: objCourseId, "reviews.studentId": objStudentId
                }
            )

            if (checkReviewAdded) throw new ConflictException('Review already added')

            const findReview = await this.ratingReviewModel.findOne(
                { courseId: objCourseId, studentId: objStudentId }
            )

            if (findReview) throw new ConflictException("Review Already added")

            const result = await this.ratingReviewModel.create(
                {
                    courseId: objCourseId,
                    studentId: objStudentId,
                    rating: rating,
                    review: review
                }
            );

            if (!result) throw new Error("Unable to save the data")

            const courseUpdate = await this.courseModel.updateOne(
                { _id: objCourseId },
                {
                    $addToSet: {
                        reviews: {
                            studentId: objStudentId,
                            reviewId: result._id
                        }
                    }
                }
            )

            if (!courseUpdate) {
                throw new Error("Unable to update the courseModel");
            }
            return this.learningService.getMyCourses(studentId)

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }



    async getReviewsForDetailpage(courseId) {
        //get review details

        try {
            const objCourseId = new Types.ObjectId(courseId)
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
            ])

            console.log(reviewData)

            if (!reviewData || reviewData.length < 1) {
                throw new NotFoundException("reviews not found")
            }

            return reviewData
        } catch (error) {
            throw error
        }

    }

}
