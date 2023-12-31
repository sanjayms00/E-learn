import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Course extends Document {

//   @Prop({ type: Types.ObjectId, required: true })
//   category_id: Types.ObjectId;

  @Prop({ required: true })
  courseName: string;


  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: string;

  @Prop({ required: true })
  estimatedPrice: number;

//   @Prop()
//   courseTags: string;

//   @Prop()
//   courseLevel: string;

  @Prop()
  video: string;

  @Prop()
  thumbnail: string;

//   @Prop()
//   benefits: string[];

//   @Prop()
//   prerequisites: string[];

//   @Prop({
//     type: [
//       {
//         title: String,
//         videoTitle: String,
//         videoUrl: String,
//         videoLength: Number,
//         videoDescription: String,
//         ResourceLinks: [String],
//       },
//     ],
//   })
//   courseContent: Record<string, any>[]; 

//   @Prop({ type: [{ rating: Number, message: String }] })
//   review: Record<string, any>[];
}

export const courseSchema = SchemaFactory.createForClass(Course);
