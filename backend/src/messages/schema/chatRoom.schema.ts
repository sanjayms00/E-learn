import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Message } from "./message.schema";


@Schema({ timestamps: true })
export class ChatRoom extends Document {

    @Prop({ type: Types.ObjectId, ref: 'Student' })
    student: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Instructor' })
    instructor: Types.ObjectId;

    @Prop([{ type: Types.ObjectId, ref: 'Message' }])
    messages: Types.ObjectId[] | Message[];
}

export const ChatSchema = SchemaFactory.createForClass(ChatRoom)