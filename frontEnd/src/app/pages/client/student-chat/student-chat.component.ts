import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/services/auth.service';
import { users, Chats, onloadResponse, message, MessageResponse } from '../../../shared/interface/chat.interface';
import { ChatService } from '../../../shared/services/chat.service';
import { getclient } from '../../../shared/store/selectors/client.selector';
import { appState } from '../../../shared/store/state/app.state';

@Component({
  selector: 'app-student-chat',
  templateUrl: './student-chat.component.html'
})
export class StudentChatComponent {


  studentId: string = ''
  users: users[] = []
  chats: Chats[] = []
  role: "Instructor" | "Student" = "Student";
  currentChat: Chats | null = null
  notification: MessageResponse[] = []

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private store: Store<appState>,
    private destroyRef: DestroyRef
  ) { }


  ngOnInit(): void {

    this.store.select(getclient)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.studentId = res._id
      })

    if (this.studentId == '') {
      this.authService.clientLogout()
    }

    this.chatService.socket.emit("studentChatOnload", { studentId: this.studentId }, (response: onloadResponse) => {

      this.users = response.users
      this.chats = response.chats
    });

    this.chatService.socket.on('message', (response: MessageResponse) => {
      if (this.currentChat?._id === response.message.chatRoom) {
        this.currentChat?.messages.push(response.message)
      }

      if (response.message.senderType !== this.role) {
        if (!this.currentChat || (this.currentChat._id !== response.message.chatRoom && response.chatRoomData.student == this.studentId)) {
          this.chatService.pushNotification(response);
          this.notification = this.chatService.notification
        }
      }

    });

  }

  chatEvent(event: Event) {
    // event to add a chat  or load the existing chat

    this.chatService.socket.emit("accessChat", { studentId: this.studentId, instructorId: event }, (response: Chats) => {

      const existingChat = this.chats.find(item => item._id === response._id)

      if (!existingChat) {
        this.chats.push(response)
      }

      this.currentChat = response

      this.chatService.removeNotification(response._id)

    });
  }

  loadMessageEvent(event: Event) {
    //load the chat and messages
    this.chatService.socket.emit("loadMessages", { chatId: event }, (response: Chats) => {
      this.currentChat = response

      this.chatService.removeNotification(response._id)
      this.notification = this.chatService.notification

    })
  }

  messageEvent(event: message) {

    event.sender._id = this.studentId
    event.senderType = this.role

    this.chatService.socket.emit("createMessage", { ...event }, (response: message) => {
      // this.currentChat?.messages.push(response)
    })

  }




}
