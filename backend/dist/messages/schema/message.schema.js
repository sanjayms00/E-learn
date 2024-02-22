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
exports.MessageSchema = exports.Message = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_validator_1 = require("class-validator");
let Message = class Message {
};
exports.Message = Message;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, refPath: "senderType" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Message.prototype, "sender", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, refPath: "senderType" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Message.prototype, "receiver", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, mongoose_1.Prop)({ required: true, enum: ["Student", "Instructor"] }),
    __metadata("design:type", String)
], Message.prototype, "senderType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, required: true, ref: "ChatRoom" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Message.prototype, "chatRoom", void 0);
exports.Message = Message = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Message);
exports.MessageSchema = mongoose_1.SchemaFactory.createForClass(Message);
//# sourceMappingURL=message.schema.js.map