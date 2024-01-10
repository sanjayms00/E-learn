export interface VideoData {
    _id: string;
    instructorId: string;
    title: string;
    description: string;
    file: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CourseData {
    id: string;
    oldImage: string;
    oldVideoData: VideoData[];
    courseName: string;
    courseDescription: string;
    courseCategory: string;
    coursePrice: string;
    courseTags: string;
    courseLevel: string[];
    files: string[];
    fields: {
        videoTitle: string;
        videoDescription: string;
        files: string | null;
    }[];
}