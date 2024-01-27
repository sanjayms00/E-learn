import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Instructor } from '../schema/instructor.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class InstructorProfileService {


    constructor(
        @InjectModel(Instructor.name)
        private instructorModel: Model<Instructor>
    ) { }

    async profileData(instructorId: string) {
        
        const ObjInstructorId = new Types.ObjectId(instructorId)

        const instructorData = await this.instructorModel.findOne(
            { _id: ObjInstructorId },
            { password: 0 }
        )

        if(!instructorData) throw new NotFoundException('instructor not found')

        return instructorData
    }



}
