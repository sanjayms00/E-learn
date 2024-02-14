import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { io } from 'socket.io-client';
import { constant } from 'src/app/core/constant/constant';
import { AuthService } from 'src/app/core/services/auth.service';
import { Chats, message, onloadResponse, users } from 'src/app/shared/interface/chat.interface';
import { ChatService } from 'src/app/shared/services/chat.service';
import { getInstructor } from 'src/app/shared/store/selectors/instructor.selector';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-instructor-chat',
  templateUrl: './instructor-chat.component.html'
})
export class InstructorChatComponent implements OnInit {

  socket = io(constant.socketLink);
  instructorId: string = ''
  users: users[] = []
  chats: Chats[] = []
  role: "instructor" | "student" = "instructor";
  currentChat: Chats | null = null

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private store: Store<appState>
  ) { }


  ngOnInit(): void {

    this.store.select(getInstructor).subscribe(res => {
      this.instructorId = res._id
    })

    if (this.instructorId == '') {
      this.authService.instructorLogout()
    }

    this.socket.emit("instructorChatOnload", { instructorId: this.instructorId }, (response: onloadResponse) => {
      console.log("instructorChatOnload", response)

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
    this.socket.emit("accessChat", { instructorId: this.instructorId, studentId: event }, (response: Chats) => {

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

    event.sender = this.instructorId
    event.senderType = this.role

    this.socket.emit("createMessage", { ...event }, (response: message) => {

      // this.currentChat?.messages.push(response)
    })

  }


}
