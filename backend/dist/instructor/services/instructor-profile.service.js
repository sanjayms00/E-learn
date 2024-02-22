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
exports.InstructorProfileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const instructor_schema_1 = require("../schema/instructor.schema");
const mongoose_2 = require("mongoose");
const upload_service_1 = require("../../common/service/upload.service");
const signed_url_service_1 = require("../../common/service/signed-url.service");
let InstructorProfileService = class InstructorProfileService {
    constructor(instructorModel, uploadService, signedUrlService) {
        this.instructorModel = instructorModel;
        this.uploadService = uploadService;
        this.signedUrlService = signedUrlService;
    }
    async profileUpdate(instructorId, formData, image) {
        const ObjInstructorId = new mongoose_2.Types.ObjectId(instructorId);
        const UpdationQuery = {
            fullName: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            headline: formData.headline,
            biography: formData.biography,
            twitter: formData.twitter,
            facebook: formData.facebook,
            instagram: formData.instagram,
            linkedin: formData.linkedin,
            website: formData.website
        };
        let uploadResult;
        if (image) {
            uploadResult = await this.uploadService.uploadImage(image);
            if (!uploadResult.imageSignedUrl || !uploadResult.imageName) {
                throw new Error('Failed to upload image to S3.');
            }
            UpdationQuery['image'] = uploadResult.imageName;
        }
        const instructorData = await this.instructorModel.updateOne({ _id: ObjInstructorId }, { $set: UpdationQuery });
        if (!instructorData) {
            throw new common_1.NotFoundException('Instructor not found');
        }
        const updatedInstructorData = await this.instructorModel.findOne({ _id: ObjInstructorId }, { password: 0 });
        let imageSignedUrl = null;
        if (image) {
            imageSignedUrl = await this.signedUrlService.generateSignedUrl(uploadResult.imageName);
        }
        return {
            instructorData: updatedInstructorData,
            imageSignedUrl
        };
    }
    async profileImage(image) {
        const signedProfileImage = await this.signedUrlService.generateSignedUrl(image);
        return signedProfileImage;
    }
};
exports.InstructorProfileService = InstructorProfileService;
exports.InstructorProfileService = InstructorProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        upload_service_1.UploadService,
        signed_url_service_1.SignedUrlService])
], InstructorProfileService);
//# sourceMappingURL=instructor-profile.service.js.map