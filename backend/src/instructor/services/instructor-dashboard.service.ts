import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        try {
            // console.log(instructorId)
            const objInstructorId = new Types.ObjectId(instructorId)
            const courseStudentCount = await this.courseModel.aggregate([
                {
                    $match: { instructorId: objInstructorId }
                },
                {
                    $group: {
                        _id: null,
                        totalCourses: { $sum: 1 },
                        totalStudents: { $sum: { $size: "$students" } }
                    }
                }

            ])

            return {
                courseStudentCount
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


}
