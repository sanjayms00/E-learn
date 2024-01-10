import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { Observable } from 'rxjs';
import { Course } from 'src/app/shared/interface/common.interface';

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

  updateCourse(data: FormData) {
    return this.http.put(`${constant.baseUrl}/instructor/update-course`, data)
  }

  getInstructorCourse() {
    return this.http.get(`${constant.baseUrl}/instructor/courses`)
  }

  getHomeCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${constant.baseUrl}/student/home-courses`)
  }

  courseDetails(id: string): Observable<Course> {
    return this.http.get<Course>(`${constant.baseUrl}/student/course-details/${id}`)
  }

  checkout(data: Course) {
    return this.http.post(`${constant.baseUrl}/student/checkout`, data)
  }

}
