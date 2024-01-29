import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { constant } from '../../constant/constant';
import { StreamResponse } from 'src/app/shared/interface/video.interface';
import { myLearning } from 'src/app/shared/interface/myLearning.interface';
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
  streamCourse(courseId: string, videoId: string) {

    const params = new HttpParams()
      .set('courseId', courseId)
      .set('videoId', videoId);

    return this.http.get<StreamResponse>(`${constant.baseUrl}/student/learning/stream-course`, { params })
  }

}
