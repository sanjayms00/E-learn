import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})
class AdminSchema {

    @Prop()
    username : string

    @Prop()
    email : string

    @Prop()
    password : string

    @Prop()
    token : string

}


export const adminSchema = SchemaFactory.createForClass(AdminSchema)