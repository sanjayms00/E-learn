import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/services/auth.service';
import { users, Chats, onloadResponse, message, MessageResponse, role } from '../../../shared/interface/chat.interface';
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
  role: role = role.Student;
  currentChat!: Chats
  notifications: MessageResponse[] = []

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

      console.log(response)


      this.users = response.users
      this.chats = response.chats
    });

    this.chatService.recieveMessage()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: message) => {
        if (this.currentChat?._id === response.chatRoom) {
          this.currentChat?.messages.push(response)
        }
      })

    this.chatService.socket.on('message', (response: MessageResponse) => {

    });

  }

  ngDoCheck(): void {
    if (this.chatService.notification.length > 0) {
      this.notifications = this.chatService.notification.filter(notification => {
        return notification.message && notification.message.receiver == this.studentId;
      })
    }
  }

  chatEvent(event: string) {
    // event is receiver id 

    this.chatService.socket.emit("accessChat", { studentId: this.studentId, instructorId: event }, (response: Chats) => {

      const existingChat = this.chats.find(item => item._id === response._id)

      if (!existingChat) {
        this.chats.push(response)
      }

      this.currentChat = response
      this.chatService.studentCurrentChat = response._id

      this.chatService.removeNotification(response._id)

    });
  }

  loadMessageEvent(event: string) {
    //load the chat and messages
    this.chatService.socket.emit("loadMessages", { chatId: event }, (response: Chats) => {
      this.currentChat = response
      this.chatService.studentCurrentChat = response._id

      this.chatService.removeNotification(response._id)
      this.notifications = this.chatService.notification

    })
  }

  messageEvent(event: message) {

    event.sender = this.studentId
    event.senderType = this.role

    this.chatService.sendMessage(event)
      .subscribe(response => {
        this.currentChat?.messages.push(response)
      })
  }

}
