import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';
import { Chats } from '../../interface/chat.interface';

@Component({
  selector: 'app-chat-right',
  templateUrl: './chat-right.component.html'
})
export class ChatRightComponent implements OnChanges, OnInit {

  noProfile = constant.noProfile
  message = ""
  maxHeight = 200
  currentTime = new Date()

  @Input() currentChat: Chats | null = null
  @Input() role!: "instructor" | "student";
  @Output() messageEvent = new EventEmitter()

  constructor() { }


  ngOnInit(): void {
    console.log("onload", this.currentChat)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("on changes", this.currentChat)
    this.message = ""
  }

  sendMessage() {

    const messageData = {
      content: this.message,
      chatRoom: this.currentChat?._id
    }

    this.messageEvent.emit(messageData)

    this.message = ""
  }

  adjustTextareaHeight(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    if (target.tagName.toLowerCase() === 'textarea') {
      target.style.height = 'auto';
      target.style.height = Math.min(target.scrollHeight, this.maxHeight) + 'px';
    }
  }
}
