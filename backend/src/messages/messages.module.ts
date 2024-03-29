import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chatRoom.schema';
import { MessageSchema } from './schema/message.schema';
import { instructorSchema } from 'src/instructor/schema/instructor.schema';
import { studentJwtAuthGuard } from 'src/student/guards/student.guard';
import { studentSchema } from 'src/student/schema/student.schema';
import { courseSchema } from 'src/instructor/schema/course.schema';
import { NotificationSchema } from './schema/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ChatRoom', schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: 'Instructor', schema: instructorSchema }]),
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),
    MongooseModule.forFeature([{ name: 'Course', schema: courseSchema }]),
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
  ],
  providers: [
    MessagesGateway,
    MessagesService,
    studentJwtAuthGuard
  ],
  exports : [
    studentJwtAuthGuard
  ]
})
export class MessagesModule {

}
