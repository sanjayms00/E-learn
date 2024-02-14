import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { Observable } from 'rxjs';
import { Course, homeResponse } from 'src/app/shared/interface/common.interface';
import { CourseDetail } from 'src/app/shared/interface/courseDetails.interface';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environment/environment';

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

  //instructor course list
  getInstructorCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(`${constant.baseUrl}/instructor/courses`)
  }

  homeData(): Observable<homeResponse> {
    return this.http.get<homeResponse>(`${constant.baseUrl}/student/home`)
  }

  courseDetails(id: string): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(`${constant.baseUrl}/student/course-details/${id}`)
  }

  checkout(courseContent: CourseDetail) {
    this.http.post(`${constant.baseUrl}/student/checkout`, {
      course: courseContent
    }).subscribe(async (res: any) => {
      console.log("response", res)
      console.log("response", res.id)
      const stripe = await loadStripe(environment.stripe.publicKey);
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

  //delete Course
  deleteCourse(courseId: string): Observable<Course[]> {
    return this.http.delete<Course[]>(`${constant.baseUrl}/instructor/delete-course/${courseId}`)
  }

}
