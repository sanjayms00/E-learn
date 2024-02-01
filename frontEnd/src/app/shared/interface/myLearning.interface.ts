
export interface MyCourse {
  _id: string;
  courseName: string;
  thumbnail: string;
  instructorId: string;
  courseTags: string;
  courseLevel: string[];
  videos: string[];
  updatedAt: Date;

}

export interface myLearning {
  _id: string;
  myCourses: MyCourse;
  progress: number;
  watched: string[];
  instructorName: string;
}
