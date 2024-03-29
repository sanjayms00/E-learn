/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './schema/message.schema';
import { ChatRoom } from './schema/chatRoom.schema';
import { Model, Types } from 'mongoose';
import { Course } from 'src/instructor/schema/course.schema';
import { accessChat } from 'src/common/interfaces/chat.interface';
import { Notification } from './schema/notification.schema';
export declare class MessagesService {
    private chatRoomModel;
    private messageModel;
    private courseModel;
    private notificationModel;
    constructor(chatRoomModel: Model<ChatRoom>, messageModel: Model<Message>, courseModel: Model<Course>, notificationModel: Model<Notification>);
    accessChat(data: accessChat): Promise<import("mongoose").Document<unknown, {}, ChatRoom> & ChatRoom & {
        _id: Types.ObjectId;
    }>;
    instructor(studentId: string): Promise<any[]>;
    studentChats(studentId: string): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, ChatRoom> & ChatRoom & {
        _id: Types.ObjectId;
    }, never>, never>[]>;
    createMessage(createMessageDto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, Message> & Message & {
        _id: Types.ObjectId;
    }>;
    addNotification(notification: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, Notification> & Notification & {
        _id: Types.ObjectId;
    }>;
    deleteNotification(data: {
        chatId: string;
        role: string;
    }): Promise<import("mongodb").DeleteResult>;
    loadMessages(chatId: string): Promise<import("mongoose").Document<unknown, {}, ChatRoom> & ChatRoom & {
        _id: Types.ObjectId;
    }>;
    students(instructorId: string): Promise<any[]>;
    instructorChats(instructorId: string): Promise<Omit<Omit<import("mongoose").Document<unknown, {}, ChatRoom> & ChatRoom & {
        _id: Types.ObjectId;
    }, never>, never>[]>;
    getNotifications(userId: string): Promise<Omit<import("mongoose").Document<unknown, {}, Notification> & Notification & {
        _id: Types.ObjectId;
    }, never>[]>;
}
