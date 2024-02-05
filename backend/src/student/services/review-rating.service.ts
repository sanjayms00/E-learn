import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

            const result = await this.ratingReviewModel.updateOne(
                { courseId: objCourseId, studentId: objStudentId },
                {
                    $set: {
                        courseId: objCourseId,
                        studentId: objStudentId,
                        rating: rating,
                        review: review
                    }
                },
                { upsert: true }
            );
            if (!result) throw new Error("Unable to save the data")

            const updatedDocument = await this.ratingReviewModel.findOne({ courseId: objCourseId })

            if (!updatedDocument) throw new Error("Unable to save the data")

            const courseUpdate = await this.courseModel.updateOne(
                { _id: objCourseId },
                {
                    $addToSet: {
                        reviews: {
                            studentId: objStudentId,
                            reviewId: updatedDocument._id
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


}
