import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { IsString } from "class-validator";


export type ChatDocument = ChatRoom & Document;

@Schema({ timestamps: true })
export class ChatRoom {

    // @IsString()
    // @Prop({ required: true, trim: true })
    // chatName: string

    // @Prop({ required: true, default: false })
    // isGroupChat: boolean

    @Prop({ type: Types.ObjectId, ref: 'Student' })
    student: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Instructor' })
    instructor: Types.ObjectId;

    // @Prop({ type: Types.ObjectId, ref: 'Message', required: false })
    // latestMessage?: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'Message' })
    messages?: Types.ObjectId

    // @Prop({ type: Types.ObjectId, ref: 'Student', required: false })
    // groupAdmin?: Types.ObjectId
}

export const ChatSchema = SchemaFactory.createForClass(ChatRoom)