import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class Student {

    @Prop({ required: true })
    fName : string;

    @Prop({ required: true })
    lName : string;

    @Prop({ required: true })
    email : string;

    @Prop({ required: true })
    password : string;

}

export const studentSchema =  SchemaFactory.createForClass(Student)
