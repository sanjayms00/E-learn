"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const jwt_1 = require("@nestjs/jwt");
const student_schema_1 = require("../schema/student.schema");
const mailer_1 = require("@nestjs-modules/mailer");
const token_schema_1 = require("../schema/token.schema");
const crypto = __importStar(require("crypto"));
let StudentAuthService = class StudentAuthService {
    constructor(studentModel, jwtService, mailerlService, tokenModel) {
        this.studentModel = studentModel;
        this.jwtService = jwtService;
        this.mailerlService = mailerlService;
        this.tokenModel = tokenModel;
    }
    async signUp(signUpData) {
        try {
            const { fullName, mobile, email } = signUpData;
            const isClient = await this.studentModel.findOne({ email: signUpData.email });
            if (isClient) {
                throw new common_1.ConflictException('User already exist');
            }
            const hashedPassword = await bcrypt.hash(signUpData.password, 10);
            const user = await this.studentModel.create({
                fullName,
                email,
                mobile,
                password: hashedPassword,
                status: false,
            });
            if (!user)
                throw new Error("Unable to save the data");
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyOtp(data) {
        try {
            const findStudent = await this.studentModel.findOne({
                email: data.email,
                otp: data.otp,
                expirationTime: { $gte: new Date() }
            }, { password: 0, otp: 0 });
            if (!findStudent)
                throw new common_1.NotFoundException("Student Not Found or otp expired");
            const UpdateStudentStatus = await this.studentModel.updateOne({ email: data.email }, {
                $set: {
                    status: true
                }
            });
            if (!UpdateStudentStatus) {
                throw new Error("Status updation failed");
            }
            const access_token = await this.jwtService.sign({ id: findStudent._id }, { secret: process.env.JWT_SECRET_CLIENT });
            if (!access_token)
                throw new common_1.HttpException('Token not found', common_1.HttpStatus.FORBIDDEN);
            return {
                access_token,
                user: findStudent
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginData) {
        try {
            const client = await this.studentModel.findOne({ email: loginData.email });
            if (!client)
                throw new common_1.UnauthorizedException('Invalid email or password');
            if (client.status === false)
                throw new common_1.ForbiddenException('Access denied, User is blocked');
            const isPasswordMatched = await bcrypt.compare(loginData.password, client.password);
            if (!isPasswordMatched) {
                throw new common_1.UnauthorizedException('Invalid email or password');
            }
            const access_token = this.jwtService.sign({ id: client._id }, { secret: process.env.JWT_SECRET_CLIENT });
            const clientObject = client.toJSON();
            const { password, courses, __v, ...result } = clientObject;
            return {
                access_token,
                user: result
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sendOTP(email) {
        const currentTime = new Date();
        const expirationTime = new Date(currentTime.getTime() + 2 * 60000);
        const otp = Math.floor(1000 + Math.random() * 9000);
        const setOtp = await this.studentModel.updateOne({ email }, {
            $set: {
                otp,
                creationTime: currentTime,
                expirationTime: expirationTime,
            }
        });
        if (!setOtp)
            throw new Error("OTP generation failed");
        try {
            await this.mailerlService.sendMail({
                to: email,
                subject: 'Welcome to Elearn, confirm your otp',
                html: `<p>Hello ${email},</p><p>Your OTP is: ${otp}</p>`,
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async forgotPassword(email) {
        try {
            if (!email) {
                throw new common_1.NotFoundException("email is not found");
            }
            const student = await this.studentModel.findOne({ email });
            if (!student) {
                throw new common_1.NotFoundException("Student is not found");
            }
            const token = crypto.randomBytes(48).toString('base64url');
            const tokenSaveResult = await this.createForgottenpasswordToken(email, token, student._id);
            const url = `https://sanjayms.online/reset-password/${token}`;
            const emailSent = await this.mailerlService.sendMail({
                to: email,
                subject: 'Welcome to E-learn! Reset your password',
                html: `<p>Hello ${student.fullName},</p> <p>Welcome to Nice App! Please click the following link to reset your password:</p> <a href="${url}" target="_blank">Reset Password</a>
        `,
            });
            if (!emailSent)
                throw new Error("email not send");
            return { status: true, message: "Mail sent successfully" };
        }
        catch (error) {
            throw new common_1.HttpException("Mail not sent successfully", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createForgottenpasswordToken(email, token, id) {
        try {
            const forgotPasswordSave = await this.tokenModel.findOneAndUpdate({ email: email }, {
                $set: {
                    email,
                    id,
                    token
                }
            }, {
                upsert: true, new: true
            });
            if (!forgotPasswordSave) {
                throw new common_1.HttpException("failed to save the token", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return forgotPasswordSave;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async resetPassword(token, password) {
        try {
            const studentEmail = await this.tokenModel.findOne({ token }, { email: 1 });
            if (!studentEmail)
                throw new common_1.NotFoundException("Student is not found");
            const hashedPassword = await bcrypt.hash(password, 10);
            const resetPassword = await this.studentModel.updateOne({ email: studentEmail.email }, {
                $set: {
                    password: hashedPassword
                }
            });
            if (!resetPassword)
                throw new Error("Unable to reset the password");
            return { status: true, message: "password reset successful" };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.StudentAuthService = StudentAuthService;
exports.StudentAuthService = StudentAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(3, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        mailer_1.MailerService,
        mongoose_2.Model])
], StudentAuthService);
//# sourceMappingURL=student-auth.service.js.map