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
    mobile: number,
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
    _id: string,
    courseName: string;
    slug: string;
    description?: string;
    categoryId?: string,
    price: string;
    estimatedPrice: string,
    thumbnail: string,
    video?: string,
    createdAt: Date,
    updatedAt: Date,
    instructorName?: string
}

export interface instrctorModel {
    _id: string,
    fullName: string
}

export interface categoryInterface {
    _id: string,
    categoryName: string;
    status?: boolean;
}


export interface filterInterFace {
    rating?: number;
    range?: number;
    instructor?: string,
    category?: string,
    year?: number
}



export interface instructorCourse {
    _id: string;
    courseName: string;
    description: string;
    price: string;
    categoryId: string;
    thumbnail: string;
    instructorId: string;
    courseTags: string;
    courseLevel: string[];
    videos: Video[];
}

export interface Video {
    _id: string;
    instructorId: string;
    title: string;
    description: string;
    file: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export interface categories {
    categoryName: string,
    _id: string,
    status?: boolean
}