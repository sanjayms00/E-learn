"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const student_auth_controller_1 = require("./controllers/student_auth.controller");
const student_auth_service_1 = require("./services/student-auth.service");
const studentJwt_strategy_1 = require("./strategy/studentJwt.strategy");
const student_schema_1 = require("./schema/student.schema");
const student_course_controller_1 = require("./controllers/student-course.controller");
const student_course_service_1 = require("./services/student-course.service");
const course_schema_1 = require("../instructor/schema/course.schema");
const mailer_1 = require("@nestjs-modules/mailer");
const instructor_schema_1 = require("../instructor/schema/instructor.schema");
const category_schema_1 = require("../admin/schema/category.schema");
const student_guard_1 = require("./guards/student.guard");
const category_controller_1 = require("./controllers/category.controller");
const category_service_1 = require("../common/service/category.service");
const signed_url_service_1 = require("../common/service/signed-url.service");
const learning_controller_1 = require("./controllers/learning.controller");
const learning_service_1 = require("./services/learning.service");
const video_schema_1 = require("../instructor/schema/video.schema");
const path_1 = require("path");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const config_1 = require("@nestjs/config");
const token_schema_1 = require("./schema/token.schema");
const student_middleware_1 = require("./middlewares/student.middleware");
const review_rating_controller_1 = require("./controllers/review-rating.controller");
const review_rating_service_1 = require("./services/review-rating.service");
const ratingReview_schema_1 = require("./schema/ratingReview.schema");
const student_profile_service_1 = require("./services/student-profile.service");
const student_profile_controller_1 = require("./controllers/student-profile.controller");
const nestjs_sharp_1 = require("nestjs-sharp");
const upload_service_1 = require("../common/service/upload.service");
let StudentModule = class StudentModule {
    configure(consumer) {
        consumer
            .apply(student_middleware_1.StudentMiddleware)
            .exclude({ path: 'student/webhook', method: common_1.RequestMethod.ALL }, { path: 'student/home', method: common_1.RequestMethod.ALL }, { path: 'student/categories', method: common_1.RequestMethod.ALL }, { path: 'student/home-courses', method: common_1.RequestMethod.ALL }, { path: 'student/all-courses', method: common_1.RequestMethod.ALL }, { path: 'student/search/:searchText', method: common_1.RequestMethod.ALL }, { path: 'student/filter', method: common_1.RequestMethod.ALL }, { path: 'student/instructors', method: common_1.RequestMethod.ALL })
            .forRoutes(student_profile_controller_1.StudentProfileController, student_course_controller_1.StudentCourseController, learning_controller_1.LearningController);
    }
};
exports.StudentModule = StudentModule;
exports.StudentModule = StudentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET_CLIENT,
                signOptions: { expiresIn: process.env.JWT_EXPIRE_CLIENT },
            }),
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (config) => ({
                    transport: {
                        host: config.get('MAIL_HOST'),
                        secure: false,
                        auth: {
                            user: config.get('MAIL_USER'),
                            pass: config.get('MAIL_PASSWORD'),
                        },
                    },
                    defaults: {
                        from: `"No Reply" <${config.get('MAIL_FROM')}>`,
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, 'mail'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Student', schema: student_schema_1.studentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Instructor', schema: instructor_schema_1.instructorSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Course', schema: course_schema_1.courseSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Category', schema: category_schema_1.CategorySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Student', schema: student_schema_1.studentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Video', schema: video_schema_1.VideoSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Token', schema: token_schema_1.tokenSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'RatingReview', schema: ratingReview_schema_1.RatingReviewSchema }]),
        ],
        controllers: [
            student_auth_controller_1.StudentAuthController,
            student_profile_controller_1.StudentProfileController,
            student_course_controller_1.StudentCourseController,
            category_controller_1.CategoryController,
            learning_controller_1.LearningController,
            review_rating_controller_1.ReviewRatingController
        ],
        providers: [
            student_auth_service_1.StudentAuthService,
            studentJwt_strategy_1.StudentJwtStrategy,
            student_course_service_1.StudentCourseService,
            student_profile_service_1.StudentProfileService,
            jwt_1.JwtService,
            student_guard_1.studentJwtAuthGuard,
            category_service_1.CategoryService,
            signed_url_service_1.SignedUrlService,
            learning_service_1.LearningService,
            review_rating_service_1.ReviewRatingService,
            nestjs_sharp_1.SharpService,
            upload_service_1.UploadService
        ],
        exports: [
            studentJwt_strategy_1.StudentJwtStrategy,
            passport_1.PassportModule,
            student_guard_1.studentJwtAuthGuard
        ],
    })
], StudentModule);
//# sourceMappingURL=student.module.js.map