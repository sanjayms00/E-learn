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
exports.InstructorCourseController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const course_service_1 = require("../services/course.service");
const instructor_guard_1 = require("../guard/instructor.guard");
let InstructorCourseController = class InstructorCourseController {
    constructor(courseService) {
        this.courseService = courseService;
    }
    async createCourse(files, formData, req) {
        const instructorId = req.user.id;
        return await this.courseService.uploadCourse(files.files, files.trailer, formData, instructorId);
    }
    async updateCourseInformation(files, formData, req) {
        const instructorId = req.user.id;
        return await this.courseService.updateCourseInformation(files.files, files.trailer, formData, instructorId);
    }
    async updateSingleChapter(files, formData, req) {
        const instructorId = req.user.id;
        return await this.courseService.updateSingleChapter(files, instructorId, formData);
    }
    async updateCourseContent(files, formData, req) {
        const instructorId = req.user.id;
        return await this.courseService.updateCourseContent(files, formData, instructorId);
    }
    async getInstructorCourse(req) {
        const instructorId = req.user.id;
        if (instructorId) {
            return await this.courseService.getInstructorCourse(instructorId);
        }
        else {
            throw new common_1.NotFoundException("Intstructor id not found");
        }
    }
    async editCourse(id) {
        return await this.courseService.editCourse(id);
    }
    async editCourseContent(id) {
        return await this.courseService.editCourseContent(id);
    }
    async deleteCourse(courseId, req) {
        const instructorId = req.user.id;
        if (instructorId) {
            return await this.courseService.deleteCourse(courseId, instructorId);
        }
        else {
            throw new common_1.NotFoundException("Intstructor id not found");
        }
    }
    async deleteChapter(videoId) {
        return await this.courseService.deleteChapter(videoId);
    }
};
exports.InstructorCourseController = InstructorCourseController;
__decorate([
    (0, common_1.UseGuards)(instructor_guard_1.InstructorJwtAuthGuard),
    (0, common_1.Post)('createCourse'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'files' },
        { name: 'trailer', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InstructorCourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.UseGuards)(instructor_guard_1.InstructorJwtAuthGuard),
    (0, common_1.Post)('update-course-information'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'files' },
        { name: 'trailer', maxCount: 1 },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InstructorCourseController.prototype, "updateCourseInformation", null);
__decorate([
    (0, common_1.UseGuards)(instructor_guard_1.InstructorJwtAuthGuard),
    (0, common_1.Post)('update-single-chapter'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InstructorCourseController.prototype, "updateSingleChapter", null);
__decorate([
    (0, common_1.UseGuards)(instructor_guard_1.InstructorJwtAuthGuard),
    (0, common_1.Post)('update-course-content'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], InstructorCourseController.prototype, "updateCourseContent", null);
__decorate([
    (0, common_1.UseGuards)(instructor_guard_1.InstructorJwtAuthGuard),
    (0, common_1.Get)("courses"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstructorCourseController.prototype, "getInstructorCourse", null);
__decorate([
    (0, common_1.Get)('editCourse/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructorCourseController.prototype, "editCourse", null);
__decorate([
    (0, common_1.Get)('editCourseContent/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructorCourseController.prototype, "editCourseContent", null);
__decorate([
    (0, common_1.UseGuards)(instructor_guard_1.InstructorJwtAuthGuard),
    (0, common_1.Delete)('delete-course/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InstructorCourseController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.UseGuards)(instructor_guard_1.InstructorJwtAuthGuard),
    (0, common_1.Delete)('delete-chapter'),
    __param(0, (0, common_1.Query)('videoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstructorCourseController.prototype, "deleteChapter", null);
exports.InstructorCourseController = InstructorCourseController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], InstructorCourseController);
//# sourceMappingURL=instructor-course.controller.js.map