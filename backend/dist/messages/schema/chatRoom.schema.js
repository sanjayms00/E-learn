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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSchema = exports.ChatRoom = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ChatRoom = class ChatRoom extends mongoose_2.Document {
};
exports.ChatRoom = ChatRoom;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Student' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ChatRoom.prototype, "student", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Instructor' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], ChatRoom.prototype, "instructor", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose_2.Types.ObjectId, ref: 'Message' }]),
    __metadata("design:type", Array)
], ChatRoom.prototype, "messages", void 0);
exports.ChatRoom = ChatRoom = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], ChatRoom);
exports.ChatSchema = mongoose_1.SchemaFactory.createForClass(ChatRoom);
//# sourceMappingURL=chatRoom.schema.js.map