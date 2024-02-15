import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { constant } from 'src/app/core/constant/constant';
import { message } from '../interface/chat.interface';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    socket = io(constant.socketLink);
    notification: message[] = []

    constructor() { }


    pushNotification(message: message) {
        this.notification.push(message)
        console.log(message)
    }


}
