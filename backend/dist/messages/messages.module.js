"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesModule = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const messages_gateway_1 = require("./messages.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const chatRoom_schema_1 = require("./schema/chatRoom.schema");
const message_schema_1 = require("./schema/message.schema");
const instructor_schema_1 = require("../instructor/schema/instructor.schema");
const student_guard_1 = require("../student/guards/student.guard");
const student_schema_1 = require("../student/schema/student.schema");
const course_schema_1 = require("../instructor/schema/course.schema");
const notification_schema_1 = require("./schema/notification.schema");
let MessagesModule = class MessagesModule {
};
exports.MessagesModule = MessagesModule;
exports.MessagesModule = MessagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'ChatRoom', schema: chatRoom_schema_1.ChatSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Message', schema: message_schema_1.MessageSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Instructor', schema: instructor_schema_1.instructorSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Student', schema: student_schema_1.studentSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Course', schema: course_schema_1.courseSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: 'Notification', schema: notification_schema_1.NotificationSchema }]),
        ],
        providers: [
            messages_gateway_1.MessagesGateway,
            messages_service_1.MessagesService,
            student_guard_1.studentJwtAuthGuard
        ],
        exports: [
            student_guard_1.studentJwtAuthGuard
        ]
    })
], MessagesModule);
//# sourceMappingURL=messages.module.js.map