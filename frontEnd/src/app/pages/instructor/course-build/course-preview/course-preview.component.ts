import { Component } from '@angular/core';
import { CourseFormService } from 'src/app/shared/services/course-form.service';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css']
})
export class CoursePreviewComponent {

  constructor(
    public courseFormService: CourseFormService
  ) { }


  courseSubmit() {
    console.log(this.courseFormService.course)
  }



}
