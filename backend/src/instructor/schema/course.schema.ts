import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



interface ReviewObject {
  studentId: Types.ObjectId;
  reviewId: Types.ObjectId;
}

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
  price: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'students' }] })
  students: Types.ObjectId[];

  @Prop()
  video: string;

  @Prop()
  thumbnail: string;

  @Prop()
  trailer: string;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Instructor' })
  instructorId: Types.ObjectId;

  @Prop()
  courseTags: string;

  @Prop()
  content: string;

  @Prop()
  signedUrl: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Videos' }] })
  videos: Types.ObjectId[];

  @Prop()
  courseLevel: string[];

  @Prop({
    type: [{
      studentId: { type: Types.ObjectId, ref: 'Students' },
      reviewId: { type: Types.ObjectId, ref: 'Reviews' },
    }],
    default: [],
  })
  reviews: { studentId: Types.ObjectId; reviewId: Types.ObjectId }[];

}

export const courseSchema = SchemaFactory.createForClass(Course);




