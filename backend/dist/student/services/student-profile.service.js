"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentProfileService = void 0;
const mongoose_1 = require("mongoose");
const config_1 = require("@nestjs/config");
const student_schema_1 = require("../schema/student.schema");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const signed_url_service_1 = require("../../common/service/signed-url.service");
const upload_service_1 = require("../../common/service/upload.service");
let StudentProfileService = class StudentProfileService {
    constructor(studentModel, configService, signedUrlService, uploadService) {
        this.studentModel = studentModel;
        this.configService = configService;
        this.signedUrlService = signedUrlService;
        this.uploadService = uploadService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.getOrThrow('AWS_S3_REGION')
        });
    }
    async profileImage(image) {
        const signedProfileImage = await this.signedUrlService.generateSignedUrl(image);
        return signedProfileImage;
    }
    async updateProfile(image, profileData, studentId) {
        const ObjStudentId = new mongoose_1.Types.ObjectId(studentId);
        const UpdationQuery = {
            fullName: profileData.fullName,
            email: profileData.email,
            mobile: profileData.mobile
        };
        let uploadResult;
        if (image) {
            uploadResult = await this.uploadService.uploadImage(image);
            if (!uploadResult.imageSignedUrl || !uploadResult.imageName) {
                throw new Error('Failed to upload image to S3.');
            }
            UpdationQuery['image'] = uploadResult.imageName;
        }
        const instructorData = await this.studentModel.updateOne({ _id: ObjStudentId }, { $set: UpdationQuery });
        if (!instructorData) {
            throw new common_1.NotFoundException('Instructor not found');
        }
        const updatedStudentData = await this.studentModel.findOne({ _id: ObjStudentId }, { password: 0 });
        let imageSignedUrl = null;
        if (image) {
            imageSignedUrl = await this.signedUrlService.generateSignedUrl(uploadResult.imageName);
        }
        return {
            studentData: updatedStudentData,
            imageSignedUrl
        };
    }
    catch(error) {
        throw new Error(error);
    }
};
exports.StudentProfileService = StudentProfileService;
exports.StudentProfileService = StudentProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(student_schema_1.Student.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        config_1.ConfigService,
        signed_url_service_1.SignedUrlService,
        upload_service_1.UploadService])
], StudentProfileService);
//# sourceMappingURL=student-profile.service.js.map