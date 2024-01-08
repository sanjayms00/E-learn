import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { isNumber } from 'class-validator';
import { Date, Document } from 'mongoose';


@Schema({
    timestamps: true
})
export class Student extends Document {

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
    otp: number;

    @Prop({ type: Date, default: Date.now })
    creationTime: Date;

    @Prop({ type: Date })
    expirationTime: Date;


}

export const studentSchema = SchemaFactory.createForClass(Student)
