import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Student } from 'src/student/schema/student.schema';

@Injectable()
export class AdminDashBoardService {

    constructor(
        @InjectModel(Student.name)
        private studentModel: Model<Student>,
        @InjectModel(Instructor.name)
        private InstructorModel: Model<Instructor>,
    ) { }

    async adminDashBoard() {
        const student = await this.studentCount()
        const instructor = await this.instructorCount()
        const graph = await this.graphData()

        return {
            student, instructor, graph
        }
    }

    async studentCount() {
        const students = await this.studentModel.aggregate([
            {
                $match: {}
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ])

        if (students.length < 1) throw new NotFoundException("No students found")

        return students
    }

    async instructorCount() {
        const instructor = await this.InstructorModel.aggregate([
            {
                $match: {}
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ])

        if (instructor.length < 1) throw new NotFoundException("No instructor found")

        return instructor
    }


    async graphData() {

        const today = new Date();
        const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())

        const studentData = this.studentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: oneMonthAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ])

        return studentData
    }


}
