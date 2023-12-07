import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
export class Admin {

    @Prop()
    username : string

    @Prop()
    email : string

    @Prop()
    password : string


}


export const adminSchema = SchemaFactory.createForClass(Admin)