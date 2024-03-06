/// <reference types="node" />
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
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { Video } from 'src/instructor/schema/video.schema';
import { SharpService } from 'nestjs-sharp';
import { SignedUrlService } from 'src/common/service/signed-url.service';
import { Student } from 'src/student/schema/student.schema';
export declare class CourseService {
    private instructorModel;
    private readonly configService;
    private courseModel;
    private videoModel;
    private studentModel;
    private sharpService;
    private signedUrlService;
    private s3Client;
    constructor(instructorModel: Model<Instructor>, configService: ConfigService, courseModel: Model<Course>, videoModel: Model<Video>, studentModel: Model<Student>, sharpService: SharpService, signedUrlService: SignedUrlService);
    compressImage(inputBuffer: Buffer): Promise<Buffer>;
    uploadCourse(files: any, trailer: any, otherData: any, instructorId: any): Promise<Error | {
        status: string;
        message: string;
    }>;
    updateCourseInformation(files: any, trailer: any, otherData: any, instructorId: any): Promise<{
        status: string;
        message: string;
    }>;
    updateSingleChapter(files: any, id: any, formData: any): Promise<any[]>;
    updateCourseContent(files: any, otherData: any, instructorId: any): Promise<any[] | Error>;
    getInstructorCourse(instructorId: string): Promise<(import("mongoose").Document<unknown, {}, Course> & Course & {
        _id: Types.ObjectId;
    })[]>;
    editCourse(id: string): Promise<import("mongoose").Document<unknown, {}, Course> & Course & {
        _id: Types.ObjectId;
    }>;
    editCourseContent(id: string): Promise<any[]>;
    deleteCourse(courseId: string, instructorId: string): Promise<(import("mongoose").Document<unknown, {}, Course> & Course & {
        _id: Types.ObjectId;
    })[]>;
    deleteChapter(videoId: any): Promise<any[]>;
}
