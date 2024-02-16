import { Component, DoCheck, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';
import { Chats, MessageResponse, message, users } from '../../interface/chat.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-left',
  templateUrl: './chat-left.component.html',
  styleUrls: ['./chat-left.component.css']
})
export class ChatLeftComponent implements OnChanges {

  noProfile = constant.noProfile
  suggestion = false
  timeOut: any
  search: string = '';
  searchResult: users[] = [];

  @Input() role!: "Instructor" | "Student";
  @Input() users: users[] = [];
  @Input() notifications: MessageResponse[] = [];
  @Input() chats: Chats[] = [];
  @Output() chatEvent = new EventEmitter()
  @Output() loadMessageEvent = new EventEmitter()

  constructor(
    private chatservice: ChatService
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.notifications)
  }

  onChange(event: string) {

    this.suggestion = true

    this.searchResult = this.users.filter(item => {
      return item.fullName.toLowerCase().includes(event.toLowerCase())
    })

    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.suggestion = false
    }, 5000);

  }

  openChat(id: string) {
    this.chatEvent.emit(id)
  }


  loadmessages(chatId: string) {
    this.loadMessageEvent.emit(chatId)
  }

  getUnreadNotificationCount(chatRoomId: string): number {
    return this.notifications.filter(notification => notification.message.chatRoom == chatRoomId).length;
  }




}
