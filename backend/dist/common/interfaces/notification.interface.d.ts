export interface message {
    sender: {
        fullName: string;
        _id: string;
    };
    content: string;
    senderType: string;
    chatRoom: string;
    createdAt: Date;
    _id: string;
}
export interface ChatRoomData {
    instructor: string;
    student: string;
}
export interface notification {
    chatRoomData: ChatRoomData;
    message: message;
}
