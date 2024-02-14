import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'socket.io';
import { UnauthorizedException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessagesGateway {

  @WebSocketServer()
  server: Server

  constructor(private readonly messagesService: MessagesService) { }

  @SubscribeMessage('accessChat')
  accessChat(
    @MessageBody() data
  ) {
    return this.messagesService.accessChat(data);
  }

  // student

  @SubscribeMessage('studentChatOnload')
  async studnentChatOnload(
    @MessageBody() studentData: { studentId: string }
  ) {
    const { studentId } = studentData

    const users = await this.messagesService.instructor(studentId);
    console.log(studentId)
    const chats = await this.messagesService.studentChats(studentId);

    return {
      users, chats
    }
  }

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {

    const message = await this.messagesService.createMessage(createMessageDto);

    //emit the message created to all users  event name message
    this.server.emit('message', message)

    return message
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

  @SubscribeMessage('findAllChats')
  async findAllChats() {
    // return await this.messagesService.findAllChats();
  }

  @SubscribeMessage('loadMessages')
  async loadMessages(
    @MessageBody() chat: { chatId: string }
  ) {

    const { chatId } = chat
    const chatWithMessages = await this.messagesService.loadMessages(chatId);

    return chatWithMessages

  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket
  ) {

    console.log(name, client)

    // return this.messagesService.identify(name, client.id)
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket
  ) {
    // const name = await this.messagesService.getClientByName(client.id)

    // client.broadcast.emit('typing', { name, isTyping })

  }


  // @SubscribeMessage('findOneMessage')
  // findOne(@MessageBody() id: number) {
  //   return this.messagesService.findOne(id);
  // }

  // @SubscribeMessage('updateMessage')
  // update(@MessageBody() updateMessageDto: UpdateMessageDto) {
  //   return this.messagesService.update(updateMessageDto.id, updateMessageDto);
  // }

  // @SubscribeMessage('removeMessage')
  // remove(@MessageBody() id: number) {
  //   return this.messagesService.remove(id);
  // }




  //instructor


  @SubscribeMessage('instructorChatOnload')
  async instructorChatOnload(
    @MessageBody() instructorData: { instructorId: string }
  ) {
    const { instructorId } = instructorData

    const users = await this.messagesService.students(instructorId);
    const chats = await this.messagesService.instructorChats(instructorId);

    console.log(users, chats)

    return {
      users, chats
    }
  }



}
