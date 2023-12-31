import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  uploadCourse(data: FormData) {
    return this.http.post(`${constant.baseUrl}/instructor/add-course`, data)
  }

  getInstructorCourse(){
    return this.http.get(`${constant.baseUrl}/instructor/files`)
  }



}
