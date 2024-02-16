import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class Instructor extends Document {

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    mobile: number;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    status: boolean;

    @Prop()
    headline: string;

    @Prop()
    biography: string;

    @Prop()
    twitter: string;

    @Prop()
    facebook: string;

    @Prop()
    instagram: string;

    @Prop()
    linkedin: string;

    @Prop()
    website: string;

    @Prop()
    image: string; 

}

export const instructorSchema = SchemaFactory.createForClass(Instructor)


