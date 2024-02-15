import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';
import { Chats, message } from '../../interface/chat.interface';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-chat-right',
  templateUrl: './chat-right.component.html'
})
export class ChatRightComponent implements OnChanges, OnInit {

  noProfile = constant.noProfile
  message = ""
  maxHeight = 200
  currentTime = new Date()
  isOpened = false;
  theme$!: Observable<string>;
  @Input() emojiInput$: Subject<string> | undefined;
  @ViewChild("container") container: ElementRef<HTMLElement> | undefined;

  @Input() currentChat: Chats | null = null
  @Input() role!: "Instructor" | "Student";
  @Output() messageEvent = new EventEmitter()



  ngOnInit(): void {
    console.log("onload", this.currentChat)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("on changes", this.currentChat)
    this.message = ""
  }

  sendMessage() {

    const messageData: message = {
      content: this.message,
      chatRoom: this.currentChat!._id,
      sender: {
        fullName: '',
        _id: ''
      },
      senderType: '',
      createdAt: new Date()
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

  emojiSelected(event: any) {
    this.emojiInput$?.next(event.emoji.native)
    this.message += event.emoji.native;
  }

  eventHandler = (event: Event) => {
    // Watching for outside clicks
    if (!this.container?.nativeElement.contains(event.target as Node)) {
      this.isOpened = false;
      window.removeEventListener("click", this.eventHandler);
    }
  };

  toggled() {
    this.isOpened = !this.isOpened;
    if (this.isOpened) {
      window.addEventListener("click", this.eventHandler);
    } else {
      window.removeEventListener("click", this.eventHandler);
    }
  }


}
