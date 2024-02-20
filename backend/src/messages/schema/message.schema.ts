import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { IsString } from "class-validator";

@Schema({ timestamps: true })
export class Message {

    @Prop({ type: Types.ObjectId, required: true, refPath: "senderType" })
    sender: Types.ObjectId

    @Prop({ type: Types.ObjectId, required: true, refPath: "senderType" })
    receiver: Types.ObjectId

    @IsString()
    @Prop({ required: true, trim: true })
    content: string

    @IsString()
    @Prop({ required: true, enum: ["Student", "Instructor"] })
    senderType: string

    @Prop({ type: Types.ObjectId, required: true, ref: "ChatRoom" })
    chatRoom: Types.ObjectId
}

export const MessageSchema = SchemaFactory.createForClass(Message)