import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
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

  instructorId: string = ''
  users: users[] = []
  chats: Chats[] = []
  role: "Instructor" | "Student" = "Instructor";
  currentChat: Chats | null = null

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private store: Store<appState>,
    private destroyRef: DestroyRef
  ) { }


  ngOnInit(): void {

    this.store.select(getInstructor)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.instructorId = res._id
      })

    if (this.instructorId == '') {
      this.authService.instructorLogout()
    }

    this.chatService.socket.emit("instructorChatOnload", { instructorId: this.instructorId }, (response: onloadResponse) => {

      this.users = response.users
      this.chats = response.chats
    });

    this.chatService.socket.on('message', (message: message) => {
      if (this.currentChat?._id === message.chatRoom) {
        this.currentChat?.messages.push(message)
      }

      if (message.senderType !== this.role) {
        this.chatService.pushNotification(message)
      }
    });

  }

  chatEvent(event: Event) {
    // event to add a chat  or load the existing chat
    this.chatService.socket.emit("accessChat", { instructorId: this.instructorId, studentId: event }, (response: Chats) => {

      const existingChat = this.chats.find(item => item._id === response._id)

      if (!existingChat) {
        this.chats.push(response)
      }

      this.currentChat = response

    });

  }

  loadMessageEvent(event: Event) {
    //load the chat and messages
    this.chatService.socket.emit("loadMessages", { chatId: event }, (response: Chats) => {
      this.currentChat = response
    })
  }


  messageEvent(event: message) {

    event.sender._id = this.instructorId
    event.senderType = this.role

    this.chatService.socket.emit("createMessage", { ...event }, (response: message) => {

      // this.currentChat?.messages.push(response)
    })

  }


}
