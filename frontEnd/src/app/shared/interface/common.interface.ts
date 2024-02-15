import { RatingReview } from "./courseDetails.interface";

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
    image: string,
    mobile: string,
    status: boolean,
    createdAt: Date
    updatedAt: Date
}

export interface instructorInterface {
    _id: string,
    fullName: string
    email: string,
    headline: string,
    biography: string,
    twitter: string,
    facebook: string,
    instagram: string,
    linkedin: string,
    website: string,
    image: string,
    mobile: string,
    status: boolean,
    createdAt: Date
    updatedAt: Date,
}

export interface Course {
    _id: string;
    courseName: string;
    description: string;
    categoryId: string;
    price: number;
    students: string[];
    signedUrl: string;
    thumbnail: string;
    trailer: string;
    videos?: string[];
    courseTags: string;
    content: string;
    courseLevel: string[];
    reviews?: [
        {
            studentId: string,
            reviewId: string,
            _id: string
        }
    ]
    createdAt: Date;
    updatedAt: Date;
    instructorName: string;
    categoryName: string;
    ratingreview: RatingReview[];
    videoData: [{
        title: string,
        description: string
    }]
}

export interface VideoData {
    title: string;
    description: string;
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
    level?: string;
    instructor?: string;
    category?: string;
}

export interface instructorCourse {
    _id: string;
    courseName: string;
    description: string;
    content: string;
    price: string;
    categoryId: string;
    thumbnail: string;
    signedUrl: string;
    trailer: string;
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

export interface ChapterInterface {
    videoId: string;
    oldVideo: string;
    title: string;
    description: string;
    file: any;
}


export interface homeResponse {
    courses: Course[],
    allCounts: {
        courseCount: number,
        categoryCount: number,
        ratingCount: number,
        instructorCount: number,
        studentCount: number
    }
}