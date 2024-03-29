import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { constant } from '../../core/constant/constant';
import { MessageDetailedResponse, MessageResponse, message } from '../interface/chat.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    socket!: Socket
    notification: MessageDetailedResponse[] = []
    studentCurrentChat: string | null = null
    instructorCurrentChat: string | null = null

    connect(userId: string) {
        this.socket.emit('connection', userId, (response: MessageDetailedResponse[]) => {
            this.notification = response
        });
    }

    initialize() {
        this.socket = io(constant.socketLink);

        this.socket.on('notification', (response: MessageDetailedResponse) => {

            if (this.studentCurrentChat == response.chatRoom) {
                return
            }

            if (this.instructorCurrentChat == response.chatRoom) {
                return
            }

            this.uploadNotification(response)

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

    removeNotification(chatId: string, senderType: string) {
        
        this.socket.emit('removeNotification', { chatId, senderType });

        this.notification = this.notification.filter(notification => notification.chatRoom !== chatId);

    }

    uploadNotification(notification: MessageDetailedResponse) {
        this.socket.emit("addNotification", notification, (response: MessageDetailedResponse) => {
            this.notification.push(response)
        })
    }


}
