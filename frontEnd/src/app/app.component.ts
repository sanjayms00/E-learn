import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ChatService } from './shared/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {


  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.initialize()
  }


}
