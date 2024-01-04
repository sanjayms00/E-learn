import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseFormService {

  course = {
    information: {},
    content: {},
  }

  constructor() { }

}
