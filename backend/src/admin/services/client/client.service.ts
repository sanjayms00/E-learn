import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        return await this.instructorModel.find({ }, { password: 0, __v: 0 })
    }

    async changeStatus(data: statusDto) {
        try {
            const result = await this.studentModel.updateOne(
                { _id: data.id },
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

}
