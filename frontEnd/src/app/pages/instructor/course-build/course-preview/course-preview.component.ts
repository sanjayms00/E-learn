import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseFormService } from 'src/app/shared/services/course-form.service';

@Component({
  selector: 'app-course-preview',
  templateUrl: './course-preview.component.html',
  styleUrls: ['./course-preview.component.css']
})
export class CoursePreviewComponent implements OnInit, DoCheck {

  courseData!: any
  progressbar = 0


  constructor(
    public courseFormService: CourseFormService,
    private router: Router
  ) { }


  ngDoCheck(): void {
    this.progressbar = this.courseFormService.progressbar
  }

  ngOnInit(): void {
    this.courseData = this.courseFormService.course
    if (Object.keys(this.courseFormService.course.information && this.courseFormService.course.content).length === 0) {
      this.router.navigateByUrl('/instructor/create/information')
    }
  }

  courseSubmit() {
    this.courseFormService.createCourse()
      .subscribe(res => {
        console.log(res)
        // this.router.navigateByUrl('instructor/courses')
      })



  }



}
