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
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const messages_service_1 = require("./messages.service");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const create_message_dto_1 = require("./dto/create-message.dto");
let MessagesGateway = class MessagesGateway {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async accessChat(data, client) {
        const chat = await this.messagesService.accessChat(data);
        client.join(chat._id.toString());
        return chat;
    }
    async studnentChatOnload(studentData) {
        const { studentId } = studentData;
        const users = await this.messagesService.instructor(studentId);
        const chats = await this.messagesService.studentChats(studentId);
        return {
            users, chats
        };
    }
    async createMessage(createMessageDto, client) {
        const messageData = await this.messagesService.createMessage(createMessageDto);
        const room = messageData.chatRoom.toString();
        client.to(room).emit("message", messageData);
        client.to(messageData.receiver.toString()).emit("notification", { message: messageData });
        return messageData;
    }
    async addNotification(message) {
        const notification = await this.messagesService.addNotification(message);
        return notification;
    }
    async deleteStudentNotification(chatId) {
        const notification = await this.messagesService.deleteNotification(chatId);
        return notification;
    }
    async connection(userId, client) {
        client.join(userId);
        const notifications = await this.messagesService.getNotifications(userId);
        client.emit("notification", { message: notifications });
        return notifications;
    }
    async findAllInstructors(payload, client) {
        const studentId = payload.studentId;
        if (!studentId)
            throw new common_1.UnauthorizedException("student id not found");
    }
    async loadMessages(chat, client) {
        const { chatId } = chat;
        client.join(chatId.toString());
        const chatWithMessages = await this.messagesService.loadMessages(chatId);
        return chatWithMessages;
    }
    async instructorChatOnload(instructorData) {
        const { instructorId } = instructorData;
        const users = await this.messagesService.students(instructorId);
        const chats = await this.messagesService.instructorChats(instructorId);
        return {
            users, chats
        };
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('accessChat'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "accessChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('studentChatOnload'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "studnentChatOnload", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "createMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('addNotification'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "addNotification", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeNotificaion'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "deleteStudentNotification", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('connection'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "connection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllInstructors'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "findAllInstructors", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('loadMessages'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "loadMessages", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('instructorChatOnload'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "instructorChatOnload", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        path: '/ws',
        cors: {
            origin: "*",
        }
    }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map