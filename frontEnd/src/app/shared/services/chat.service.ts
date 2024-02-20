import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { constant } from '../../core/constant/constant';
import { MessageResponse, message } from '../interface/chat.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    socket!: Socket
    notification: MessageResponse[] = []
    sudentCurrentChat: string | null = null
    instructorCurrentChat: string | null = null

    connect(userId: string) {
        this.socket.emit('connection', userId, (response: MessageResponse) => {
            console.log("connection response", response)

            this.notification.push(response)
        });
    }

    initialize() {
        this.socket = io(constant.socketLink);

        this.socket.on('notification', (response: MessageResponse) => {
            console.log("notification response", response)
            this.notification.push(response)
        });

    }

    //send a ne message
    sendMessage(event: message): Observable<message> {
        return new Observable((observer) => {
            this.socket.emit("createMessage", { ...event }, (response: message) => {
                observer.next(response)
            })
        })
    }

    //recieve a message add to chat in sender
    recieveMessage(): Observable<message> {
        return new Observable((observer) => {
            this.socket.on('message', (response: message) => {
                observer.next(response)
            });
        })
    }

    removeNotification(chatId: string) {

        //remove db notification
        this.socket.emit('removeNotification', chatId);

        if (this.notification.length > 0) {
            this.notification = this.notification.filter(noti => {
                return noti.message && noti.message.chatRoom !== chatId
            })
        }
    }

    UploadNotification(notification: MessageResponse) {
        this.socket.emit("addNotification", { ...notification }, (response: message) => {
            console.log(response)
        })
    }


}
