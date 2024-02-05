export interface CourseDetail {
    _id: string;
    courseName: string;
    description: string;
    categoryId: string;
    price: number;
    students: string[];
    thumbnail: string;
    trailer: string;
    videos?: string[];
    courseTags: string;
    content: string;
    courseLevel: string[];
    reviews?: Review[];
    createdAt: Date;
    updatedAt: Date;
    instructorName: string;
    categoryName: string;
    ratingreview: RatingReview[];
    videoData: VideoData[];
}

export interface Review {
    studentId: string;
    reviewId: string;
    _id: string;
}

export interface RatingReview {
    _id: string;
    courseId: string;
    createdAt: Date;
    rating: number;
    studentId: string;
    updatedAt: Date;
}

export interface VideoData {
    title: string;
    description: string;
}
const emptyReview: Review = {
    studentId: '',
    reviewId: '',
    _id: '',
};

const emptyRatingReview: RatingReview = {
    _id: '',
    courseId: '',
    createdAt: new Date(),
    rating: 0,
    studentId: '',
    updatedAt: new Date(),
};

const emptyVideoData: VideoData = {
    title: '',
    description: '',
};

const emptyCourse: CourseDetail = {
    _id: '',
    courseName: '',
    description: '',
    categoryId: '',
    price: 0,
    students: [],
    thumbnail: '',
    trailer: '',
    courseTags: '',
    content: '',
    courseLevel: [],
    reviews: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    instructorName: '',
    categoryName: '',
    ratingreview: [emptyRatingReview],
    videoData: [emptyVideoData],
};

export const initialCourseDetails: CourseDetail = { ...emptyCourse };
