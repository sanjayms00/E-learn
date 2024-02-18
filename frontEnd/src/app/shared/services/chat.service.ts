import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { constant } from 'src/app/core/constant/constant';
import { MessageResponse, message } from '../interface/chat.interface';


@Injectable({
    providedIn: 'root'
})
export class ChatService {

    socket = io(constant.socketLink);

    notification: MessageResponse[] = []
    instructorNotification: MessageResponse[] = []

    pushNotification(message: MessageResponse) {
        this.notification.push(message)
        // this.UploadNotification(message)

    }

    pushInstructorNotification(message: MessageResponse) {
        this.instructorNotification.push(message)
        // this.UploadNotification(message)

    }

    removeNotification(chatId: string) {

        if (this.notification.length > 0) {
            this.notification = this.notification.filter(noti => {
                return noti.message.chatRoom !== chatId
            })
        }
    }

    removeInstructorNotification(chatId: string) {

        if (this.instructorNotification.length > 0) {
            this.instructorNotification = this.instructorNotification.filter(noti => {
                return noti.message.chatRoom !== chatId
            })
        }
    }

    getInstructorNotifications(instructorId: string) {
        // if (this.notification.length > 0) {
        //     this.notification = this.notification.filter(noti => {
        //         return noti.sender._id !== instructorId
        //     })
        // }
    }


    UploadNotification(notification: MessageResponse) {
        this.socket.emit("addNotification", { ...notification }, (response: message) => {
            console.log(response)
        })
    }


}
