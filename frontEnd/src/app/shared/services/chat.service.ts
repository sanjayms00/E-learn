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


    pushNotification(message: message) {
        this.notification.push(message)
    }

    removeNotification(chatId: string) {

        if (this.notification.length > 0) {
            this.notification = this.notification.filter(noti => {
                return noti.chatRoom !== chatId
            })
        }

    }
}
