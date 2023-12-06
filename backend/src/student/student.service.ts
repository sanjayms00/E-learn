import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Student } from 'src/schemas/student.schema';

@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) 
        private studentModel: mongoose.Model<Student>
    ){}

    async findAll(): Promise<Student[]>
    {
        return await this.studentModel.find()
    }

    async createStudent(data: Student): Promise<Student>
    {
        const isValid = await this.studentModel.find({email : data.email})
        if(isValid){
            throw new ConflictException("Already registed")
        }
        
        return await this.studentModel.create(data)
    }

    async findById(id : string): Promise<Student>
    {
        const student =  await this.studentModel.findById(id)

        if(!student){
            throw new NotFoundException("student not found")
        }

        return student
    }

    async updateById(id : string, data : Student): Promise<Student>
    {
        const student =  await this.studentModel.findByIdAndUpdate(id, data)

        if(!student){
            throw new NotFoundException("student not found")
        }

        return student
    }

}
