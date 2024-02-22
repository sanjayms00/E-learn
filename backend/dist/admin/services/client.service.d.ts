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
import { Model, Types } from 'mongoose';
import { statusDto } from 'src/admin/dtos/status.dto';
import { Student } from 'src/student/schema/student.schema';
import { Instructor } from 'src/instructor/schema/instructor.schema';
export declare class ClientService {
    private studentModel;
    private instructorModel;
    constructor(studentModel: Model<Student>, instructorModel: Model<Instructor>);
    getAllStudents(): Promise<(import("mongoose").Document<unknown, {}, Student> & Student & {
        _id: Types.ObjectId;
    })[]>;
    getAllInstructors(): Promise<(import("mongoose").Document<unknown, {}, Instructor> & Instructor & {
        _id: Types.ObjectId;
    })[]>;
    changeStudentStatus(data: statusDto): Promise<{
        status: string;
    }>;
    changeInstructorStatus(data: statusDto): Promise<{
        status: string;
    }>;
}
