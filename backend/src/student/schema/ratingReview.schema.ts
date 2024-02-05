import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true
})
export class RatingReview extends Document {
    @Prop({ type: Types.ObjectId, ref: "courses", required: true })
    courseId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: "students", required: true })
    studentId: Types.ObjectId;

    @Prop({ required: true })
    rating: number;

    @Prop({ required: true })
    review: string;
}

export const RatingReviewSchema = SchemaFactory.createForClass(RatingReview)
