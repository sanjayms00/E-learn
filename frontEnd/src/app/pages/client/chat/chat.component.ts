import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/client/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  textArea: string = '';
  isEmojiPickerVisible!: boolean;
  @ViewChild('messages', { static: false }) messagesElement!: ElementRef
  socket = io('http://localhost:3000')
  messages: any = []
  client!: any;
  name: string = ''
  joined = false
  typigDisplay = ''
  timeout!: any

  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.client = this.chatService.getClientName()

    this.name = this.client.fullName
    console.log(this.name)
    this.socket.emit('findAllMessages', {}, (res: any) => {
      this.messages = res
    })

    this.socket.on('typing', ({ name, isTyping }) => {
      if (isTyping) {
        this.typigDisplay = `${name} is typing...`
      } else {
        this.typigDisplay = ''
      }
    })

    this.socket.on('messages', (message: any) => {
      this.messages.push(message)
    })


  }


  join() {
    this.socket.emit('join', { name: this.name }, () => {
      this.joined = true
    })
  }

  emitTyping() {
    this.socket.emit('typing', { isTyping: true })
    this.timeout = setTimeout(() => {
      this.socket.emit('typing', { isTyping: false })
    }, 2000);
  }

  sendMessage() {
    if (this.textArea !== '') {
      this.socket.emit('createMessage', { text: this.textArea }, (res: any) => {
        this.textArea = ''
      })
    }
  }

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
