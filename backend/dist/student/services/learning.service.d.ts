/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Student } from '../schema/student.schema';
import { Types } from 'mongoose';
import { Video } from 'src/instructor/schema/video.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { SignedUrlService } from 'src/common/service/signed-url.service';
export declare class LearningService {
    private studentModel;
    private videoModel;
    private courseModel;
    private signedUrlService;
    constructor(studentModel: Model<Student>, videoModel: Model<Video>, courseModel: Model<Course>, signedUrlService: SignedUrlService);
    getMyCourses(studentId: string): Promise<any[]>;
    streamCourseData(courseId: string, videoId: string, studentId: string): Promise<{
        courseData: any[];
        studentData: import("mongoose").Document<unknown, {}, Student> & Student & {
            _id: Types.ObjectId;
        };
    }>;
    updateChapterViewed(studentId: any, chapterId: any, courseId: any): Promise<import("mongoose").Document<unknown, {}, Student> & Student & {
        _id: Types.ObjectId;
    }>;
    findStudentCourse(objStudentId: any, objCourseId: any): Promise<import("mongoose").Document<unknown, {}, Student> & Student & {
        _id: Types.ObjectId;
    }>;
}
