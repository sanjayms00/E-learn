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
import { Model, Types } from "mongoose";
import { ConfigService } from '@nestjs/config';
import { Student } from "../schema/student.schema";
import { SignedUrlService } from "src/common/service/signed-url.service";
import { UploadService } from "src/common/service/upload.service";
export declare class StudentProfileService {
    private studentModel;
    private readonly configService;
    private signedUrlService;
    private uploadService;
    private s3Client;
    constructor(studentModel: Model<Student>, configService: ConfigService, signedUrlService: SignedUrlService, uploadService: UploadService);
    profileImage(image: string): Promise<string>;
    updateProfile(image: File, profileData: any, studentId: string): Promise<{
        studentData: import("mongoose").Document<unknown, {}, Student> & Student & {
            _id: Types.ObjectId;
        };
        imageSignedUrl: any;
    }>;
    catch(error: any): void;
}
