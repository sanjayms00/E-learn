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

export interface studentInterface {
    _id: string,
    fullName: string
    email: string,
    mobile:number,
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

export interface Course {
    courseName: string;
    description: string;
    price: string;
}


export interface categoryInterface {
    categoryName: string;
    status: boolean;
}