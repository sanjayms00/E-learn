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
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/student/schema/student.schema';
import { SignupDto } from 'src/common/dtos/signDto';
import { userAuthReturn } from 'src/common/types/type';
import { MailerService } from '@nestjs-modules/mailer';
import { Token } from '../schema/token.schema';
export declare class StudentAuthService {
    private studentModel;
    private jwtService;
    private mailerlService;
    private tokenModel;
    constructor(studentModel: Model<Student>, jwtService: JwtService, mailerlService: MailerService, tokenModel: Model<Token>);
    signUp(signUpData: SignupDto): Promise<import("mongoose").Document<unknown, {}, Student> & Student & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    verifyOtp(data: any): Promise<userAuthReturn>;
    login(loginData: any): Promise<userAuthReturn>;
    sendOTP(email: string): Promise<void>;
    forgotPassword(email: string): Promise<{
        status: boolean;
        message: string;
    }>;
    createForgottenpasswordToken(email: string, token: string, id: string): Promise<import("mongoose").Document<unknown, {}, Token> & Token & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    resetPassword(token: string, password: any): Promise<{
        status: boolean;
        message: string;
    }>;
}
