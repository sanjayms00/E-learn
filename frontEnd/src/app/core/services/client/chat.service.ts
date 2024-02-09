import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environment/environment';
import { constant } from '../../constant/constant';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket = io(constant.chatUrl)

  constructor(
    private authService: AuthService
  ) { }

  findAllMessages() {
    this.socket.emit('findAllMessages', {},)
  }


  getClientName() {
    const clientData = localStorage.getItem('clientData')
    if (clientData) {
      return JSON.parse(clientData).fullName
    }
    this.authService.clientLogout()
  }


}
