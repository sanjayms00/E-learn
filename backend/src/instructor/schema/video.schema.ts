import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Video extends Document {
    @Prop({ required: true, type: Types.ObjectId, ref: 'courses' })
    instructorId: Types.ObjectId;

    @Prop({ required: true })
    index: number;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    file: string;
}


export const VideoSchema = SchemaFactory.createForClass(Video);
