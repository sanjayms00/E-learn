import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseFormService {

  course = {
    information: {},
    content: {},
  }

  constructor(
    private http: HttpClient
  ) { }

  createCourse() {
    console.log(this.course)
  }


}
