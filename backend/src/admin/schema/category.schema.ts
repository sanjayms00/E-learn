import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type CatDocument = HydratedDocument<Category>;

@Schema({
    timestamps: true
})
export class Category {

    @Prop({required: true})
    categoryName : string

    @Prop({ required: true })
    status : boolean;


}


export const CategorySchema = SchemaFactory.createForClass(Category)