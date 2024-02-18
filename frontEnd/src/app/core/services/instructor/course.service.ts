import { HttpClient } from '@angular/common/http';
import { DestroyRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js';

import { constant } from '../../constant/constant';
import { Course } from '../../../shared/interface/common.interface';
import { CourseDetail } from '../../../shared/interface/courseDetails.interface';
import { environment } from '../../../../environment/environment';
import { homeInterface } from '../../../shared/interface/client.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private destroyRef: DestroyRef
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

  homeData(): Observable<homeInterface> {
    return this.http.get<homeInterface>(`${constant.baseUrl}/student/home`)
  }

  courseDetails(id: string): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(`${constant.baseUrl}/student/course-details/${id}`)
  }

  checkout(courseContent: CourseDetail) {
    this.http.post(`${constant.baseUrl}/student/checkout`, { course: courseContent })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (res: any) => {
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
