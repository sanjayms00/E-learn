import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { io } from 'socket.io-client';
import { constant } from 'src/app/core/constant/constant';
import { AuthService } from 'src/app/core/services/auth.service';
import { users, Chats, onloadResponse, message } from 'src/app/shared/interface/chat.interface';
import { ChatService } from 'src/app/shared/services/chat.service';
import { getclient } from 'src/app/shared/store/selectors/client.selector';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-student-chat',
  templateUrl: './student-chat.component.html'
})
export class StudentChatComponent {

  socket = io(constant.socketLink);
  studentId: string = ''
  users: users[] = []
  chats: Chats[] = []
  role: "instructor" | "student" = "student";
  currentChat: Chats | null = null

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private store: Store<appState>
  ) { }


  ngOnInit(): void {

    this.store.select(getclient).subscribe(res => {
      this.studentId = res._id
    })

    if (this.studentId == '') {
      this.authService.clientLogout()
    }

    this.socket.emit("studentChatOnload", { studentId: this.studentId }, (response: onloadResponse) => {
      console.log("studentChatOnload", response)

      this.users = response.users
      this.chats = response.chats
    });

    this.socket.on('message', (message: any) => {
      if (this.currentChat?._id === message.chatRoom) {
        this.currentChat?.messages.push(message)
      }
    });

  }

  chatEvent(event: Event) {
    // event to add a chat  or load the existing chat

    this.socket.emit("accessChat", { studentId: this.studentId, instructorId: event }, (response: Chats) => {

      const existingChat = this.chats.find(item => item._id === response._id)

      if (!existingChat) {
        this.chats.push(response)
      }

      this.currentChat = response

    });
  }

  loadMessageEvent(event: Event) {
    //load the chat and messages
    this.socket.emit("loadMessages", { chatId: event }, (response: Chats) => {
      this.currentChat = response
    })
  }

  messageEvent(event: message) {

    event.sender = this.studentId
    event.senderType = this.role

    this.socket.emit("createMessage", { ...event }, (response: message) => {
      // this.currentChat?.messages.push(response)
    })

  }




}
