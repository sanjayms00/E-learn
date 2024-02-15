import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from '../schema/course.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class InstructorDashboardService {

    constructor(
        @InjectModel(Course.name)
        private courseModel: Model<Course>
    ) { }

    async dashboardData(instructorId: string) {
        
        const counts = await this.dashCounts(instructorId)
        const graphData = await this.graphData(instructorId)

        return {
            counts, 
            graphData
        }
    }

    async dashCounts(instructorId: string){
        try {
            // console.log(instructorId)
            const objInstructorId = new Types.ObjectId(instructorId)
            const dashData = await this.courseModel.aggregate([
                {
                    $match: { instructorId: objInstructorId }
                },
                {
                    $facet: {
                        totalCount: [
                            {
                                $count: "count"
                            }
                        ],
                        otherData: [
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
                                $group: {
                                    _id: null,
                                    soldOutCourse: { $sum: { $size: "$students" } },
                                    totalRating: { $sum: "$reviewData.rating" },
                                    totalReviews: { $sum: 1 }
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    totalCourses: 1,
                                    soldOutCourse: 1,
                                    averageRating: { $divide: ["$totalRating", "$totalReviews"] }
                                }
                            }
                        ]
                    }
                }
            ])

            if (dashData.length < 1) throw new NotFoundException("Dashboard data not found")

            return {
                courses: dashData[0].totalCount[0].count,
                sold: dashData[0].otherData[0].soldOutCourse,
                rating: dashData[0].otherData[0].averageRating
            }

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async graphData(instructorId: string){
        try {

            const objInstructorId = new Types.ObjectId(instructorId)

            const today = new Date();
            const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())

            const graphData = await this.courseModel.aggregate([
                {
                    $match: {
                        instructorId: objInstructorId,
                        createdAt: { $gte: oneMonthAgo }
                    }
                },
                {
                    $group: {
                        _id: '$courseName',
                        count: { $sum: { $size: '$students' } }, 
                    },
                },
            ])

            console.log(graphData)

            return graphData

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }



}
