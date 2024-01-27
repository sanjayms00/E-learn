import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true
})
export class Token extends Document {

    @Prop({ required: true })
    email: string;

    @Prop({ type: Types.ObjectId, ref: "students", required: true })
    id: Types.ObjectId;

    @Prop()
    token: string;
}

export const tokenSchema = SchemaFactory.createForClass(Token)
