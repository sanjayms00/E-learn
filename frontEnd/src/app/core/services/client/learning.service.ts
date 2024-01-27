import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { constant } from '../../constant/constant';
import { StreamResponse } from 'src/app/shared/interface/video.interface';

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  http = inject(HttpClient)

  getMyCourses() {
    return this.http.get(`${constant.baseUrl}/learning/my-courses`)
  }

  //streaming video and fetcvh other course related data
  streamCourse(courseId: string, videoId: string) {

    const params = new HttpParams()
      .set('courseId', courseId)
      .set('videoId', videoId);

    return this.http.get<StreamResponse>(`${constant.baseUrl}/learning/stream-course`, { params })
  }

}
