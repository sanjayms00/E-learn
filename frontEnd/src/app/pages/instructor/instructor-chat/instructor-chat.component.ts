import { Component, DestroyRef, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/services/auth.service';
import { Chats, MessageDetailedResponse, MessageResponse, message, onloadResponse, role, users } from 'src/app/shared/interface/chat.interface';
import { ChatService } from '../../../shared/services/chat.service';
import { getInstructor } from '../../../shared/store/selectors/instructor.selector';
import { appState } from '../../../shared/store/state/app.state';

@Component({
  selector: 'app-instructor-chat',
  templateUrl: './instructor-chat.component.html'
})
export class InstructorChatComponent implements OnInit, OnDestroy, DoCheck {

  instructorId: string = ''
  users: users[] = []
  chats: Chats[] = []
  role: role = role.Instructor
  currentChat!: Chats
  instructorNotification: MessageDetailedResponse[] = []

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

    this.chatService.socket.on('message', (response: message) => {
      if (this.currentChat?._id === response.chatRoom) {
        this.currentChat?.messages.push(response)
      }
    });

  }

  ngDoCheck(): void {
    if (this.chatService.notification.length > 0) {
      this.instructorNotification = this.chatService.notification.filter(notification => {
        return notification && notification.receiver == this.instructorId;
      })
    }
  }

  chatEvent(event: Event) {
    // event to add a chat  or load the existing chat
    this.chatService.socket.emit("accessChat", { instructorId: this.instructorId, studentId: event }, (response: Chats) => {

      const existingChat = this.chats.find(item => item._id === response._id)

      if (!existingChat) {
        this.chats.push(response)
      }

      this.currentChat = response
      this.chatService.instructorCurrentChat = response._id

      this.chatService.removeNotification(response._id, this.role)

    });

  }

  loadMessageEvent(event: Event) {
    //load the chat and messages
    this.chatService.socket.emit("loadMessages", { chatId: event }, (response: Chats) => {
      this.currentChat = response
      this.chatService.instructorCurrentChat = response._id
      this.chatService.removeNotification(response._id, this.role)
      this.instructorNotification = this.chatService.notification

    })
  }


  messageEvent(event: message) {

    event.sender = this.instructorId
    event.senderType = this.role

    this.chatService.sendMessage(event)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(response => {
        this.currentChat?.messages.push(response)
      })

  }

  ngOnDestroy(): void {
    this.chatService.instructorCurrentChat = ''
  }



}
