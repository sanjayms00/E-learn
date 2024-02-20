
export interface CreateMessage {
    sender: string;
    content: string;
    chat: string;
}

export interface Chats {
    _id: string;
    student: {
        _id: string;
        fullName: string;
        image: string
    };
    instructor: {
        _id: string;
        fullName: string;
        image: string
    };
    messages: message[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface users {
    id: string,
    fullName: string,
    image?: string
}

export interface onloadResponse {
    users: users[],
    chats: Chats[]
}

export interface message {
    sender: string
    receiver: string
    content: string;
    senderType: string;
    chatRoom: string;
    createdAt: Date
}


export interface ChatRoomData {
    instructor: string;
    student: string;
}


export interface MessageResponse {
    message: {
        sender: {
            fullName: string,
            _id: string
        }
        receiver: string
        content: string;
        senderType: string;
        chatRoom: string;
        createdAt: Date
    }
}


export enum role {
    Student = "Student",
    Instructor = "Instructor"
}

