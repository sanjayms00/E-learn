import { Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/client/chat.service';
import { CreateMessage, studentChatList } from 'src/app/shared/interface/chat.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message: string = '';
  isEmojiPickerVisible!: boolean;
  @ViewChild('messages', { static: false }) messagesElement!: ElementRef
  socket = io('http://localhost:3000')
  messages: any = []
  client!: any;
  name: string = ''
  joined = false
  typigDisplay = ''
  timeout!: any
  instructors!: studentChatList[]
  noProfile = 'assets/images/no-profile.jpg'


  constructor(
    private chatService: ChatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.client = this.chatService.getClientData()

    const studentId = this.client._id
    const studentName = this.client.fullName

    this.name = this.client.fullName
    console.log(this.name)
    this.socket.emit('findAllInstructors', { studentId }, (res: any) => {
      this.instructors = res
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


  openChat(instructorId: string) {
    console.log(instructorId)
    this.router.navigate(['/chat', instructorId])
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
    if (this.message !== '') {

      const createMessage: CreateMessage = {
        sender: '',
        content: this.message,
        chat: ''
      }

      this.socket.emit('createMessage', createMessage, (res: any) => {
        this.message = ''
      })
    }
  }

  addEmoji(event: any) {
    this.message = `${this.message}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  scrollToBottom(): void {
    if (this.messagesElement) {
      this.messagesElement.nativeElement.scrollTop = this.messagesElement.nativeElement.scrollHeight;
    }
  }
}
