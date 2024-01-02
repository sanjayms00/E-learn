import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course } from 'src/instructor/schema/course.schema';

@Injectable()
export class StudentCourseService {

    constructor(
        @InjectModel(Course.name)
        private readonly courseModel: Model<Course>
    ) { }

    async getAllCourse() {
        return await this.courseModel.find({}, { video: 0 })
    }

    async getLimitedCourse() {
        return await this.courseModel.find({}, { video: 0 }).limit(8)
    }

    async searchCourse(searchText: string) {
        const regexPattern = new RegExp(searchText, 'i');
        return await this.courseModel.find({ courseName: { $regex: regexPattern } });
    }

    async courseDetails(id: string) {
        const objectId = new Types.ObjectId(id)
        return await this.courseModel.findOne({ _id: objectId }, { video: 0 });
    }
}
