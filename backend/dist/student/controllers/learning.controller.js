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
exports.LearningController = void 0;
const common_1 = require("@nestjs/common");
const learning_service_1 = require("../services/learning.service");
const student_guard_1 = require("../guards/student.guard");
let LearningController = class LearningController {
    constructor(learningService) {
        this.learningService = learningService;
    }
    getMyCourses(req) {
        const studentId = req.user._id;
        return this.learningService.getMyCourses(studentId);
    }
    streamCourseData(req, courseId, videoId) {
        const studentId = req.user._id;
        return this.learningService.streamCourseData(courseId, videoId, studentId);
    }
    updateChapterViewed(data, req) {
        const studentId = req.user._id;
        return this.learningService.updateChapterViewed(studentId, data.chapterId, data.courseId);
    }
};
exports.LearningController = LearningController;
__decorate([
    (0, common_1.UseGuards)(student_guard_1.studentJwtAuthGuard),
    (0, common_1.Get)('my-courses'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LearningController.prototype, "getMyCourses", null);
__decorate([
    (0, common_1.UseGuards)(student_guard_1.studentJwtAuthGuard),
    (0, common_1.Get)('stream-course'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('courseId')),
    __param(2, (0, common_1.Query)('videoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], LearningController.prototype, "streamCourseData", null);
__decorate([
    (0, common_1.UseGuards)(student_guard_1.studentJwtAuthGuard),
    (0, common_1.Patch)('update-chapter-viewed'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LearningController.prototype, "updateChapterViewed", null);
exports.LearningController = LearningController = __decorate([
    (0, common_1.Controller)('learning'),
    __metadata("design:paramtypes", [learning_service_1.LearningService])
], LearningController);
//# sourceMappingURL=learning.controller.js.map