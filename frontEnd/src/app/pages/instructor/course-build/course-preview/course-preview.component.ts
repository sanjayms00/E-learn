import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseFormService } from 'src/app/shared/services/course-form.service';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css']
})
export class CoursePreviewComponent implements OnInit {

  courseData!: any


  constructor(
    public courseFormService: CourseFormService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseData = this.courseFormService.course
  }

  courseSubmit() {
    this.courseFormService.createCourse()

    this.router.navigateByUrl('instructor/courses')

  }



}
