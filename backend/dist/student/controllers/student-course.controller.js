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
exports.StudentCourseController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const student_guard_1 = require("../guards/student.guard");
const student_course_service_1 = require("../services/student-course.service");
let StudentCourseController = class StudentCourseController {
    constructor(studentCourseService, configService) {
        this.studentCourseService = studentCourseService;
        this.configService = configService;
        this.endpointSecret = this.configService.getOrThrow('END_POINT_SECRET');
    }
    async home() {
        return await this.studentCourseService.home();
    }
    async getAllCourse() {
        return await this.studentCourseService.getAllCourse();
    }
    async searchCourse(searchText) {
        return await this.studentCourseService.searchCourse(searchText);
    }
    async courseDetails(courseId) {
        const courseData = await this.studentCourseService.courseDetails(courseId);
        console.log(courseData);
        return courseData;
    }
    async getInstructors() {
        return await this.studentCourseService.getInstructors();
    }
    async getcategories() {
        return await this.studentCourseService.getCategories();
    }
    async filterCourse(level, instructor, category) {
        const filterCredentials = {
            level,
            instructor,
            category,
        };
        return await this.studentCourseService.getFilteredCourses(filterCredentials);
    }
    async checkout(courseData, req) {
        return await this.studentCourseService.checkout(courseData, req.user._id);
    }
    async webhookStripe(req) {
        const raw = req.rawBody;
        console.log("web hook");
        try {
            if (this.endpointSecret) {
                const eventData = JSON.parse(raw.toString());
                if (eventData.type === 'checkout.session.completed') {
                    const paymentIntentId = eventData.data.object.payment_intent;
                    const studentId = JSON.parse(eventData.data.object.metadata.studentId);
                    const courseId = eventData.data.object.metadata.courseId;
                    console.log(`Payment succeeded. PaymentIntent ID: ${paymentIntentId}`, studentId, courseId);
                    return await this.studentCourseService.paymentSuccessService(paymentIntentId, studentId, courseId);
                }
            }
        }
        catch (error) {
            console.error('Error parsing webhook event:', error.message);
        }
    }
};
exports.StudentCourseController = StudentCourseController;
__decorate([
    (0, common_1.Get)('home'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "home", null);
__decorate([
    (0, common_1.Get)('all-courses'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "getAllCourse", null);
__decorate([
    (0, common_1.Get)('search/:searchText'),
    __param(0, (0, common_1.Param)('searchText')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "searchCourse", null);
__decorate([
    (0, common_1.Get)('course-details/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "courseDetails", null);
__decorate([
    (0, common_1.Get)('instructors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "getInstructors", null);
__decorate([
    (0, common_1.Get)('categories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "getcategories", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)('level')),
    __param(1, (0, common_1.Query)('instructor')),
    __param(2, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "filterCourse", null);
__decorate([
    (0, common_1.UseGuards)(student_guard_1.studentJwtAuthGuard),
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "checkout", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentCourseController.prototype, "webhookStripe", null);
exports.StudentCourseController = StudentCourseController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [student_course_service_1.StudentCourseService,
        config_1.ConfigService])
], StudentCourseController);
//# sourceMappingURL=student-course.controller.js.map