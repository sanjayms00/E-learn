import { HttpClient, HttpParams } from '@angular/common/http';
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

  //update course
  updateCourse(courseData: any) {
    return this.http.post(`${constant.baseUrl}/instructor/update-course-information`, courseData)
  }

  //update course content
  updateCourseContent(data: any): Observable<instructorCourse[]> {
    return this.http.post<instructorCourse[]>(`${constant.baseUrl}/instructor/update-course-content`, data)
  }

  //update course content
  deleteChapter(videoId: string) {
    const params = new HttpParams()
      .set('videoId', videoId)
    return this.http.delete<instructorCourse[]>(`${constant.baseUrl}/instructor/delete-chapter`, { params })
  }

  //update course chapter
  updateCourseChapter(data: any) {
    return this.http.post(`${constant.baseUrl}/instructor/update-single-chapter`, data)
  }

  //get course Data information
  editCourseData(id: string): Observable<instructorCourse> {
    return this.http.get<instructorCourse>(`${constant.baseUrl}/instructor/editCourse/${id}`)
  }

  //get course data content
  editCourseContentData(id: string): Observable<instructorCourse[]> {
    return this.http.get<instructorCourse[]>(`${constant.baseUrl}/instructor/editCourseContent/${id}`)
  }



}
