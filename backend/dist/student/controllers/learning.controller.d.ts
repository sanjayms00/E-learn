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
import { LearningService } from '../services/learning.service';
export declare class LearningController {
    private learningService;
    constructor(learningService: LearningService);
    getMyCourses(req: any): Promise<any[]>;
    streamCourseData(req: any, courseId: string, videoId: string): Promise<{
        courseData: any[];
        studentData: import("mongoose").Document<unknown, {}, import("../schema/student.schema").Student> & import("../schema/student.schema").Student & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateChapterViewed(data: {
        chapterId: string;
        courseId: string;
    }, req: any): Promise<import("mongoose").Document<unknown, {}, import("../schema/student.schema").Student> & import("../schema/student.schema").Student & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
