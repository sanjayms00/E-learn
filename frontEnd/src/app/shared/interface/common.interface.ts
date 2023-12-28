export interface loginInterface {
    email: string;
    password: string;
}

export interface SignUpInterface {
    fullName: string;
    email: string;
    mobile: number;
    password: string;
}

export interface clientInterface {
    _id: string,
    fName: string,
    lName: string,
    email: string,
    password: string,
    status: boolean,
    createdAt: Date
    updatedAt: Date
}

export interface instructorInterface {
    _id: string,
    fullName: string,
    email: string,
    mobile: string,
    status: boolean,
    createdAt: Date
    updatedAt: Date
}