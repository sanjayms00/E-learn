import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
import { UnauthorizedException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: ['https://sanjayms.online/', 'https://www.sanjayms.online/']
    // origin: "*"
  }
})
export class MessagesGateway {

  @WebSocketServer()
  server: Server

  constructor(private readonly messagesService: MessagesService) { }


  @SubscribeMessage('accessChat')
  async accessChat(
    @MessageBody() data,
    @ConnectedSocket() client: Socket
  ) {
    const chat = await this.messagesService.accessChat(data);
    client.join(chat._id.toString());
    return chat
  }


  @SubscribeMessage('studentChatOnload')
  async studnentChatOnload(
    @MessageBody() studentData: { studentId: string }
  ) {
    const { studentId } = studentData

    const users = await this.messagesService.instructor(studentId);

    const chats = await this.messagesService.studentChats(studentId);

    return {
      users, chats
    }
  }


  @SubscribeMessage('createMessage')
  async createMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket
  ) {

    const messageData = await this.messagesService.createMessage(createMessageDto);

    const room = messageData.chatRoom.toString();

    client.to(room).emit("message", messageData)

    // const notification = await this.messagesService.addNotification(createMessageDto);

    client.to(messageData.receiver.toString()).emit("notification", { message: messageData })

    return messageData
  }


  @SubscribeMessage('addNotification')
  async addNotification(
    @MessageBody() message,
  ) {

    const notification = await this.messagesService.addNotification(message);

    return notification
  }


  @SubscribeMessage('removeNotificaion')
  async deleteStudentNotification(@MessageBody() chatId) {
    const notification = await this.messagesService.deleteNotification(chatId);
    return notification
  }


  @SubscribeMessage('connection')
  async connection(@MessageBody() userId: string, @ConnectedSocket() client: Socket) {
    client.join(userId);
    //get notifications
    const notifications = await this.messagesService.getNotifications(userId)

    client.emit("notification", { message: notifications });

    return notifications

  }


  @SubscribeMessage('findAllInstructors')
  async findAllInstructors(
    @MessageBody() payload: { studentId: string },
    @ConnectedSocket() client: Socket
  ) {
    const studentId = payload.studentId

    if (!studentId) throw new UnauthorizedException("student id not found")

    // return await this.messagesService.findAllInstructors(studentId);
  }


  @SubscribeMessage('loadMessages')
  async loadMessages(
    @MessageBody() chat: { chatId: string },
    @ConnectedSocket() client: Socket
  ) {

    const { chatId } = chat

    client.join(chatId.toString());

    const chatWithMessages = await this.messagesService.loadMessages(chatId);

    return chatWithMessages

  }


  @SubscribeMessage('instructorChatOnload')
  async instructorChatOnload(
    @MessageBody() instructorData: { instructorId: string }
  ) {
    const { instructorId } = instructorData

    const users = await this.messagesService.students(instructorId);
    const chats = await this.messagesService.instructorChats(instructorId);

    return {
      users, chats
    }
  }

}
