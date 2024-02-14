import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';
import { Chats, users } from '../../interface/chat.interface';

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

  @Input() role!: "instructor" | "student";
  @Input() users: users[] = [];
  @Input() chats: Chats[] = [];
  @Output() chatEvent = new EventEmitter()
  @Output() loadMessageEvent = new EventEmitter()

  ngOnChanges(changes: SimpleChanges): void {

    console.log(this.users)

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

  openChat(id: string){
    this.chatEvent.emit(id)
  }


  loadmessages(chatId: string){
    this.loadMessageEvent.emit(chatId)
  }

}
