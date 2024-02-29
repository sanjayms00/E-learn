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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const message_schema_1 = require("./schema/message.schema");
const mongoose_1 = require("@nestjs/mongoose");
const chatRoom_schema_1 = require("./schema/chatRoom.schema");
const mongoose_2 = require("mongoose");
const instructor_schema_1 = require("../instructor/schema/instructor.schema");
const student_schema_1 = require("../student/schema/student.schema");
const course_schema_1 = require("../instructor/schema/course.schema");
const notification_schema_1 = require("./schema/notification.schema");
let MessagesService = class MessagesService {
    constructor(chatRoomModel, messageModel, instructorModel, studentModel, courseModel, notificationModel) {
        this.chatRoomModel = chatRoomModel;
        this.messageModel = messageModel;
        this.instructorModel = instructorModel;
        this.studentModel = studentModel;
        this.courseModel = courseModel;
        this.notificationModel = notificationModel;
    }
    async accessChat(data) {
        const { instructorId, studentId } = data;
        const objInstructorId = new mongoose_2.Types.ObjectId(instructorId);
        const objStudentId = new mongoose_2.Types.ObjectId(studentId);
        let chat = await this.chatRoomModel.findOne({
            student: objStudentId,
            instructor: objInstructorId
        }).exec();
        if (!chat) {
            chat = await this.chatRoomModel.create({
                student: objStudentId,
                instructor: objInstructorId,
                messages: []
            });
        }
        chat = await chat.populate({
            path: 'student',
            select: 'fullName image'
        });
        chat = await chat.populate({
            path: 'instructor',
            select: 'fullName image'
        });
        if (chat.messages.length > 0) {
            chat = await chat.populate({
                path: 'messages',
                model: 'Message'
            });
        }
        return chat;
    }
    async instructor(studentId) {
        const objStudentIdId = new mongoose_2.Types.ObjectId(studentId);
        const instructors = await this.courseModel.aggregate([
            {
                $match: {
                    students: {
                        $elemMatch: {
                            $eq: objStudentIdId
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'instructors',
                    localField: 'instructorId',
                    foreignField: '_id',
                    as: 'instructorData'
                }
            },
            {
                $unwind: "$instructorData"
            },
            {
                $group: {
                    _id: "$instructorData._id",
                    fullName: { $first: "$instructorData.fullName" },
                    image: { $first: "$instructorData.image" }
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    fullName: 1,
                    image: 1
                }
            }
        ]);
        return instructors;
    }
    async studentChats(studentId) {
        const objStudentId = new mongoose_2.Types.ObjectId(studentId);
        let chats = await this.chatRoomModel.find({
            student: objStudentId
        })
            .populate({
            path: 'instructor',
            select: 'fullName'
        })
            .populate({
            path: 'student',
            select: 'fullName'
        })
            .exec();
        return chats;
    }
    async createMessage(createMessageDto) {
        try {
            const { content, senderType, chatRoom, sender, receiver } = createMessageDto;
            const message = await this.messageModel.create({
                sender,
                receiver,
                content,
                senderType,
                chatRoom
            });
            if (!message) {
                throw new common_1.HttpException('Failed to create message.', common_1.HttpStatus.BAD_REQUEST);
            }
            const objchatRoom = new mongoose_2.Types.ObjectId(chatRoom);
            const addMessagetoRoom = await this.chatRoomModel.updateOne({ _id: objchatRoom }, {
                $push: { messages: message._id }
            });
            if (!addMessagetoRoom) {
                throw new common_1.HttpException('Failed to add message to the chat room.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await message.populate('sender', "fullName");
            return message;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async addNotification(notification) {
        console.log(notification);
        const { content, senderType, chatRoom, sender, receiver } = notification;
        const message = await this.notificationModel.create({
            sender,
            receiver,
            content,
            senderType,
            chatRoom: new mongoose_2.Types.ObjectId(chatRoom)
        });
        if (!message) {
            throw new common_1.HttpException('Failed to create notification.', common_1.HttpStatus.BAD_REQUEST);
        }
        await message.populate('sender', "fullName");
        return message;
    }
    async deleteNotification(data) {
        const deleteNotification = await this.notificationModel.deleteMany({
            chatRoom: new mongoose_2.Types.ObjectId(data.chatId),
            senderType: { $ne: data.role }
        });
        return deleteNotification;
    }
    async loadMessages(chatId) {
        const objChatId = new mongoose_2.Types.ObjectId(chatId);
        let chat = await this.chatRoomModel
            .findOne({ _id: objChatId })
            .populate("student", "fullName image")
            .populate("instructor", "fullName image")
            .populate({
            path: 'messages',
            model: 'Message'
        });
        return chat;
    }
    async students(instructorId) {
        const objInstructorId = new mongoose_2.Types.ObjectId(instructorId);
        const students = await this.courseModel.aggregate([
            {
                $match: {
                    instructorId: objInstructorId
                }
            },
            {
                $unwind: "$students"
            },
            {
                $group: {
                    _id: "$students"
                }
            },
            {
                $lookup: {
                    from: 'students',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'studentsData'
                }
            },
            {
                $unwind: "$studentsData"
            },
            {
                $group: {
                    _id: "$studentsData._id",
                    fullName: { $first: "$studentsData.fullName" },
                    image: { $first: "$studentsData.image" },
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    fullName: 1,
                    image: 1
                }
            }
        ]);
        return students;
    }
    async instructorChats(instructorId) {
        const objInstructorId = new mongoose_2.Types.ObjectId(instructorId);
        let chats = await this.chatRoomModel.find({
            instructor: objInstructorId
        })
            .populate({
            path: 'student',
            select: 'fullName'
        })
            .populate({
            path: 'instructor',
            select: 'fullName'
        })
            .exec();
        return chats;
    }
    async getNotifications(userId) {
        console.log(userId);
        const notifications = await this.notificationModel.find({
            receiver: userId
        }).populate('sender', 'fullName');
        return notifications;
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(chatRoom_schema_1.ChatRoom.name)),
    __param(1, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __param(2, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __param(3, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(4, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __param(5, (0, mongoose_1.InjectModel)(notification_schema_1.Notification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], MessagesService);
//# sourceMappingURL=messages.service.js.map