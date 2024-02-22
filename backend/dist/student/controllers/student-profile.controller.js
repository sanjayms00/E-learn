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
exports.StudentProfileController = void 0;
const common_1 = require("@nestjs/common");
const student_profile_service_1 = require("../services/student-profile.service");
const student_guard_1 = require("../guards/student.guard");
const platform_express_1 = require("@nestjs/platform-express");
let StudentProfileController = class StudentProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async updateProfile(req, image) {
        const studentId = req.user.id;
        const profileData = req.body;
        return await this.profileService.updateProfile(image, profileData, studentId);
    }
    async profileImage(image) {
        const profileImage = await this.profileService.profileImage(image);
        return { profileImage };
    }
};
exports.StudentProfileController = StudentProfileController;
__decorate([
    (0, common_1.UseGuards)(student_guard_1.studentJwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    (0, common_1.Put)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(student_guard_1.studentJwtAuthGuard),
    (0, common_1.Get)('image'),
    __param(0, (0, common_1.Query)('image')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentProfileController.prototype, "profileImage", null);
exports.StudentProfileController = StudentProfileController = __decorate([
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [student_profile_service_1.StudentProfileService])
], StudentProfileController);
//# sourceMappingURL=student-profile.controller.js.map