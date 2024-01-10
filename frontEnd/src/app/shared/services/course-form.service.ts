import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
import { constant } from 'src/app/core/constant/constant';
import { Course, instructorCourse } from '../interface/common.interface';
import { Observable } from 'rxjs';
// import { Course } from '../interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseFormService {

  progressbar = 0


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  createCourse(courseData: any) {
    return this.http.post(`${constant.baseUrl}/instructor/createCourse`, courseData)
  }

  updateCourse(courseData: any) {
    return this.http.post(`${constant.baseUrl}/instructor/updateCourse`, courseData)
  }

  editCourseData(id: string): Observable<instructorCourse[]> {
    return this.http.get<instructorCourse[]>(`${constant.baseUrl}/instructor/editCourse/${id}`)
  }


}
