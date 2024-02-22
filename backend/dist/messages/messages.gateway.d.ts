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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesGateway {
    private readonly messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    accessChat(data: any, client: Socket): Promise<import("mongoose").Document<unknown, {}, import("./schema/chatRoom.schema").ChatRoom> & import("./schema/chatRoom.schema").ChatRoom & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    studnentChatOnload(studentData: {
        studentId: string;
    }): Promise<{
        users: any[];
        chats: Omit<Omit<import("mongoose").Document<unknown, {}, import("./schema/chatRoom.schema").ChatRoom> & import("./schema/chatRoom.schema").ChatRoom & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
    }>;
    createMessage(createMessageDto: CreateMessageDto, client: Socket): Promise<import("mongoose").Document<unknown, {}, import("./schema/message.schema").Message> & import("./schema/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addNotification(message: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/notification.schema").Notification> & import("./schema/notification.schema").Notification & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteStudentNotification(chatId: any): Promise<import("mongodb").DeleteResult>;
    connection(userId: string, client: Socket): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schema/notification.schema").Notification> & import("./schema/notification.schema").Notification & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findAllInstructors(payload: {
        studentId: string;
    }, client: Socket): Promise<void>;
    loadMessages(chat: {
        chatId: string;
    }, client: Socket): Promise<import("mongoose").Document<unknown, {}, import("./schema/chatRoom.schema").ChatRoom> & import("./schema/chatRoom.schema").ChatRoom & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    instructorChatOnload(instructorData: {
        instructorId: string;
    }): Promise<{
        users: any[];
        chats: Omit<Omit<import("mongoose").Document<unknown, {}, import("./schema/chatRoom.schema").ChatRoom> & import("./schema/chatRoom.schema").ChatRoom & {
            _id: import("mongoose").Types.ObjectId;
        }, never>, never>[];
    }>;
}
