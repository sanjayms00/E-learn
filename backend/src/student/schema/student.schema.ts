import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';
import { Course } from 'src/instructor/schema/course.schema';


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

  @Prop({
    type: [{
      courseId: { type: Types.ObjectId, ref: 'Course' },
      progress: { type: Number, default: 0 },
      watched: { type: [Types.ObjectId], default: [] }
    }],
    default: [],
  })
  courses: { courseId: Course['_id']; progress: number, watched: Types.ObjectId[] }[];

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
