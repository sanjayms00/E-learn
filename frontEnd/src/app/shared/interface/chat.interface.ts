
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
    sender: string;
    content: string;
    senderType: string;
    chatRoom: string;
    createdAt: Date
}