import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { constant } from '../../constant/constant';
import { StreamResponse, studentDataViewResponse } from '../../../shared/interface/video.interface';
import { myLearning } from '../../../shared/interface/myLearning.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LearningService {

  http = inject(HttpClient)

  //get my courses
  getMyCourses(): Observable<myLearning[]> {
    return this.http.get<myLearning[]>(`${constant.baseUrl}/student/learning/my-courses`)
  }

  //streaming video and fetcvh other course related data
  streamCourse(courseId: string, videoId: string): Observable<StreamResponse> {
    const params = new HttpParams()
      .set('courseId', courseId)
      .set('videoId', videoId);

    return this.http.get<StreamResponse>(`${constant.baseUrl}/student/learning/stream-course`, { params })
  }

  //change chapter viewed
  updateChapterViewed(chapterId: string, courseId: string): Observable<studentDataViewResponse> {
    return this.http.patch<studentDataViewResponse>(`${constant.baseUrl}/student/learning/update-chapter-viewed`, {
      chapterId, courseId
    })
  }

  //find the progress
  findProgress(totalChapters: number, viewedChapters: number) {
    return (viewedChapters / totalChapters) * 100
  }


}
