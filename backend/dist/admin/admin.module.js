"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_auth_controller_1 = require("./controllers/admin_auth.controller");
const admin_auth_service_1 = require("./services/admin-auth.service");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const adminJwt_strategy_1 = require("./strategy/adminJwt.strategy");
const client_service_1 = require("./services/client.service");
const admin_schema_1 = require("./schema/admin.schema");
const mongoose_1 = require("@nestjs/mongoose");
const adminJwtAuth_guard_1 = require("./guards/adminJwtAuth.guard");
const student_schema_1 = require("../student/schema/student.schema");
const client_management_controller_1 = require("./controllers/client-management.controller");
const instructor_schema_1 = require("../instructor/schema/instructor.schema");
const category_schema_1 = require("./schema/category.schema");
const category_controller_1 = require("./controllers/category.controller");
const category_service_1 = require("../common/service/category.service");
const admin_dash_board_controller_1 = require("./controllers/admin-dash-board.controller");
const admin_dash_board_service_1 = require("./services/admin-dash-board.service");
const course_schema_1 = require("../instructor/schema/course.schema");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            admin_auth_controller_1.AdminAuthController,
            client_management_controller_1.ClientManagementController,
            category_controller_1.CategoryController,
            admin_dash_board_controller_1.AdminDashBoardController
        ],
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'admin-jwt' }),
            jwt_1.JwtModule.register({
                global: true,
                secret: process.env.JWT_SECRET_ADMIN,
                signOptions: { expiresIn: process.env.JWT_EXPIRE_ADMIN },
            }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Admin', schema: admin_schema_1.adminSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Student', schema: student_schema_1.studentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Instructor', schema: instructor_schema_1.instructorSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Category', schema: category_schema_1.CategorySchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Course', schema: course_schema_1.courseSchema }]),
        ],
        providers: [
            adminJwt_strategy_1.adminJwtStrategy,
            admin_auth_service_1.AdminAuthService,
            adminJwtAuth_guard_1.AdminJwtAuthGuard,
            client_service_1.ClientService,
            category_service_1.CategoryService,
            jwt_1.JwtService,
            admin_dash_board_service_1.AdminDashBoardService
        ],
        exports: [
            admin_auth_service_1.AdminAuthService,
            client_service_1.ClientService,
            adminJwtAuth_guard_1.AdminJwtAuthGuard
        ]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map