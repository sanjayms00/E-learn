import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { statusDto } from 'src/admin/dtos/status.dto';
import { Student } from 'src/student/schema/student.schema';
import { Instructor } from 'src/instructor/schema/instructor.schema';

@Injectable()
export class ClientService {

    constructor(
        @InjectModel(Student.name)
        private studentModel: Model<Student>,
        @InjectModel(Instructor.name)
        private instructorModel: Model<Instructor>
    ) { }

    async getAllStudents() {
        return await this.studentModel.find({}, { password: 0, __v: 0 })
    }

    async getAllInstructors() {
        return await this.instructorModel.find({}, { password: 0, __v: 0 })
    }

    async changeStudentStatus(data: statusDto) {
        try {

            if (!data.id) {
                throw new HttpException("Id is not found", HttpStatus.NOT_FOUND);
            }

            const id = new Types.ObjectId(data.id)

            const result = await this.studentModel.updateOne(
                { _id: id },
                {
                    $set: {
                        status: data.status
                    }
                }
            );

            console.log(result)
            if (!result) {
                throw new HttpException("Document not found or status unchanged", HttpStatus.NOT_FOUND);
            }

            return { status: "updated" };
        } catch (error) {
            console.log(error.message)
            throw new HttpException("Failed to update status", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async changeInstructorStatus(data: statusDto) {
        try {

            if (!data.id) {
                throw new HttpException("Id is not found", HttpStatus.NOT_FOUND);
            }

            const id = new Types.ObjectId(data.id)

            const result = await this.instructorModel.updateOne(
                { _id: id },
                {
                    $set: {
                        status: data.status
                    }
                }
            );

            console.log(result)
            if (!result) {
                throw new HttpException("Document not found or status unchanged", HttpStatus.NOT_FOUND);
            }

            return { status: "updated" };
        } catch (error) {

            throw new HttpException("Failed to update status", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
