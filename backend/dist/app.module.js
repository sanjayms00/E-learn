"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const student_module_1 = require("./student/student.module");
const admin_module_1 = require("./admin/admin.module");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const instructor_module_1 = require("./instructor/instructor.module");
const core_1 = require("@nestjs/core");
const messages_module_1 = require("./messages/messages.module");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'frontEnd'),
            }),
            student_module_1.StudentModule,
            core_1.RouterModule.register([
                {
                    path: 'student',
                    module: student_module_1.StudentModule,
                },
            ]),
            admin_module_1.AdminModule,
            core_1.RouterModule.register([
                {
                    path: 'admin',
                    module: admin_module_1.AdminModule,
                },
            ]),
            instructor_module_1.InstructorModule,
            core_1.RouterModule.register([
                {
                    path: 'instructor',
                    module: instructor_module_1.InstructorModule,
                },
            ]),
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URI),
            messages_module_1.MessagesModule,
        ],
        providers: [jwt_1.JwtService],
        controllers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map