import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Course extends Document {

  @Prop({ type: Types.ObjectId, required: true })
  categoryId: Types.ObjectId;

  @Prop({ required: true })
  courseName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: string;

  // @Prop({ required: true })
  // estimatedPrice: number;

  @Prop()
  video: string;

  @Prop()
  thumbnail: string;

  @Prop({ type: Types.ObjectId, required: true })
  instructorId: Types.ObjectId;

  @Prop()
  courseTags: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Videos' }] })
  videos: Types.ObjectId[];

  @Prop()
  courseLevel: string;

}

export const courseSchema = SchemaFactory.createForClass(Course);






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