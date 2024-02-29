/// <reference types="multer" />
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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CourseService } from 'src/instructor/services/course.service';
import { CourseData } from 'src/common/interfaces/course.interface';
export declare class InstructorCourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(files: {
        files?: Express.Multer.File[];
        trailer?: Express.Multer.File[];
    }, formData: any, req: any): Promise<Error | {
        status: string;
        message: string;
    }>;
    updateCourseInformation(files: {
        files?: Express.Multer.File[];
        trailer?: Express.Multer.File[];
    }, formData: CourseData, req: any): Promise<{
        status: string;
        message: string;
    }>;
    updateSingleChapter(files: any, formData: CourseData, req: any): Promise<any[]>;
    updateCourseContent(files: any, formData: CourseData, req: any): Promise<any[] | Error>;
    getInstructorCourse(req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schema/course.schema").Course> & import("../schema/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    editCourse(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schema/course.schema").Course> & import("../schema/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    editCourseContent(id: string): Promise<any[]>;
    deleteCourse(courseId: string, req: any): Promise<(import("mongoose").Document<unknown, {}, import("../schema/course.schema").Course> & import("../schema/course.schema").Course & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    deleteChapter(videoId: string): Promise<any[]>;
}
