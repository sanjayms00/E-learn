import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class Client {

    @Prop({ required: true })
    fName : string;

    @Prop({ required: true })
    lName : string;

    @Prop({ required: true })
    email : string;

    @Prop({ required: true })
    password : string;

    @Prop({ required: true })
    instructor : boolean;

    @Prop({ required: true })
    status : boolean;

}

export const clientSchema =  SchemaFactory.createForClass(Client)
