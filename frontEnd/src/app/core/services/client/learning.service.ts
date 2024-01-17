import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { Observable } from 'rxjs';
import { videoInterface } from 'src/app/shared/interface/video.interface';

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  constructor(
    private http: HttpClient
  ) { }


  getMyCourses() {
    return this.http.get(`${constant.baseUrl}/learning/my-courses`)
  }


  getCourseVideo(videoId: string):Observable<videoInterface>
  {
    return this.http.get<videoInterface>(`${constant.baseUrl}/learning/get-video/${videoId}`)
  }


}
