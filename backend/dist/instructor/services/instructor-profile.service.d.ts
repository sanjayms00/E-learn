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
import { Instructor } from '../schema/instructor.schema';
import { Model, Types } from 'mongoose';
import { UploadService } from 'src/common/service/upload.service';
import { SignedUrlService } from 'src/common/service/signed-url.service';
export declare class InstructorProfileService {
    private instructorModel;
    private uploadService;
    private signedUrlService;
    constructor(instructorModel: Model<Instructor>, uploadService: UploadService, signedUrlService: SignedUrlService);
    profileUpdate(instructorId: string, formData: any, image: File): Promise<{
        instructorData: import("mongoose").Document<unknown, {}, Instructor> & Instructor & {
            _id: Types.ObjectId;
        };
        imageSignedUrl: any;
    }>;
    profileImage(image: string): Promise<string>;
}
