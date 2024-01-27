import { Observable } from "rxjs";

export interface VideoCourseInterface {
  _id: string;
  categoryId: string;
  courseName: string;
  description: string;
  price: string;
  thumbnail: string;
  instructorId: string;
  courseTags: string;
  videos: string[];
  courseLevel: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  videoData: Video[];
}

export interface Video {
  _id: string;
  instructorId: string;
  courseId: string;
  index: number;
  title: string;
  description: string;
  file: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface VideoData {
  _id: string;
  instructorId: string;
  courseId: string;
  index: number;
  title: string;
  description: string;
  file: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CourseData {
  _id: string;
  categoryId: string;
  courseName: string;
  description: string;
  price: string;
  students: string[];
  thumbnail: string;
  instructorId: string;
  courseTags: string;
  videos: string[];
  courseLevel: string[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
  videoData: VideoData[];
}

export interface StreamResponse {
  courseData: CourseData[]
}
