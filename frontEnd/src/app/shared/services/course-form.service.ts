import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
// import { Observable } from 'rxjs';
import { constant } from 'src/app/core/constant/constant';
// import { Course } from '../interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseFormService {

  course = {
    information: {},
    content: {},
  }
  formData = new FormData();

  progressbar = 0


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  createCourse() {
    return this.http.post(`${constant.baseUrl}/instructor/createCourse`, this.formData, { reportProgress: true, observe: 'events' }).pipe(map(event => {
      if (event.type == HttpEventType.UploadProgress) {
        this.progressbar = Math.round((100 / (event.total || 0) * event.loaded))
      } else if (event.type == HttpEventType.Response) {
        this.progressbar = 0
        this.router.navigateByUrl('/instructor/courses')
      }
    }))


  }

}
