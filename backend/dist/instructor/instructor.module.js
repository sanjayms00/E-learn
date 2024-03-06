"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstructorModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const instructor_auth_controller_1 = require("./controllers/instructor-auth.controller");
const instructor_auth_service_1 = require("./services/instructor-auth.service");
const instructorJwt_strategy_1 = require("./strategy/instructorJwt.strategy");
const instructor_schema_1 = require("./schema/instructor.schema");
const instructor_course_controller_1 = require("./controllers/instructor-course.controller");
const course_service_1 = require("./services/course.service");
const course_schema_1 = require("./schema/course.schema");
const instructor_guard_1 = require("./guard/instructor.guard");
const video_schema_1 = require("./schema/video.schema");
const instructor_profile_controller_1 = require("./controllers/instructor-profile.controller");
const instructor_profile_service_1 = require("./services/instructor-profile.service");
const instructor_middleware_1 = require("./middlewares/instructor.middleware");
const instructor_dashboard_controller_1 = require("./controllers/instructor-dashboard.controller");
const instructor_dashboard_service_1 = require("./services/instructor-dashboard.service");
const nestjs_sharp_1 = require("nestjs-sharp");
const signed_url_service_1 = require("../common/service/signed-url.service");
const upload_service_1 = require("../common/service/upload.service");
const student_schema_1 = require("../student/schema/student.schema");
let InstructorModule = class InstructorModule {
    configure(consumer) {
        consumer
            .apply(instructor_middleware_1.InstructorMiddleware)
            .exclude()
            .forRoutes(instructor_course_controller_1.InstructorCourseController, instructor_profile_controller_1.InstructorProfileController, instructor_dashboard_controller_1.InstructorDashboardController);
    }
};
exports.InstructorModule = InstructorModule;
exports.InstructorModule = InstructorModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'instructor-jwt' }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET_INSTRUCTOR,
                signOptions: { expiresIn: process.env.JWT_EXPIRE_INSTRUCTOR },
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Instructor', schema: instructor_schema_1.instructorSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Course', schema: course_schema_1.courseSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Video', schema: video_schema_1.VideoSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Student', schema: student_schema_1.studentSchema }]),
            nestjs_sharp_1.SharpModule
        ],
        controllers: [
            instructor_auth_controller_1.InstructorAuthController,
            instructor_course_controller_1.InstructorCourseController,
            instructor_profile_controller_1.InstructorProfileController,
            instructor_dashboard_controller_1.InstructorDashboardController
        ],
        providers: [
            instructor_auth_service_1.InstructorAuthService,
            instructor_profile_service_1.InstructorProfileService,
            instructor_dashboard_service_1.InstructorDashboardService,
            course_service_1.CourseService,
            instructorJwt_strategy_1.instructorJwtStrategy,
            jwt_1.JwtService,
            instructor_guard_1.InstructorJwtAuthGuard,
            signed_url_service_1.SignedUrlService,
            nestjs_sharp_1.SharpService,
            upload_service_1.UploadService
        ],
        exports: [
            instructorJwt_strategy_1.instructorJwtStrategy,
            passport_1.PassportModule,
            instructor_guard_1.InstructorJwtAuthGuard
        ],
    })
], InstructorModule);
//# sourceMappingURL=instructor.module.js.map