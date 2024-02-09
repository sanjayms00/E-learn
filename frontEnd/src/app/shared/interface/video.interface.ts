

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
  title: string;
  description: string;
  file: string;
  signedUrl:string;
}

export interface InstructorData {
  fullName: string;
  email: string;
  mobile: number;
}

export interface CourseData {
  _id: string;
  courseName: string;
  description: string;
  content: string;
  instructorId: string;
  videoData: VideoData[];
  instructorData: InstructorData[];
}

export interface StreamResponse {
  courseData: CourseData[],
  studentData: studentDataViewResponse
}

export interface studentDataViewResponse {
  id: string,
  courses: [
    {
      courseId: string,
      progress: number,
      _id: string,
      watched: string[]
    }
  ]
}
