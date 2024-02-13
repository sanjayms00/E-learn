import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './schema/chatRoom.schema';
import { MessageSchema } from './schema/message.schema';
import { instructorSchema } from 'src/instructor/schema/instructor.schema';
import { studentJwtAuthGuard } from 'src/student/guards/student.guard';
import { studentSchema } from 'src/student/schema/student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ChatRoom', schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: 'Instructor', schema: instructorSchema }]),
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),
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
