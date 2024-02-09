import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  textArea: string = '';
  isEmojiPickerVisible!: boolean;
  @ViewChild('messages', { static: false }) messagesElement!: ElementRef

  constructor() { }


  addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  scrollToBottom(): void {
    if (this.messagesElement) {
      this.messagesElement.nativeElement.scrollTop = this.messagesElement.nativeElement.scrollHeight;
    }
  }
}
