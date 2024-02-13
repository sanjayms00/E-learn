import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { studentJwtAuthGuard } from 'src/student/guards/student.guard';
import { Request, UnauthorizedException, UseGuards } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: false,
  },
  allowEIO3: true,
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server

  constructor(private readonly messagesService: MessagesService) { }

  handleConnection(client: Socket) {
    // Handle new client connections
  }

  handleDisconnect(client: Socket) {
    // Handle client disconnections
  }


  // @SubscribeMessage('accessChat')
  // accessChat(

  // ) {
  //   return this.messagesService.accessChat(userId);
  // }


  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket
  ) {
    const message = await this.messagesService.create(createMessageDto, client.id);

    //emit the message created to alll users  event name message
    this.server.emit('messages', message)

    return message
  }

  @SubscribeMessage('findAllInstructors')
  async findAllInstructors(
    @MessageBody() payload: { studentId: string },
    @ConnectedSocket() client: Socket
  ) {
    const studentId = payload.studentId

    if(!studentId) throw new UnauthorizedException("student id not found")

    return await this.messagesService.findAllInstructors(studentId);
  }

  @SubscribeMessage('findAllChats')
  async findAllChats() {
    return await this.messagesService.findAllChats();
  }

  @SubscribeMessage('findAllMessages')
  async findAllMessages(
    @MessageBody() chatId?: string
  ) {
    return await this.messagesService.findAllMessages(chatId);
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket
  ) {

    console.log(name, client)

    return this.messagesService.identify(name, client.id)
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket
  ) {
    const name = await this.messagesService.getClientByName(client.id)

    client.broadcast.emit('typing', { name, isTyping })

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
}
