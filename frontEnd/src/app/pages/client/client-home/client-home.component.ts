import { Component, OnInit } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html'
})
export class ClientHomeComponent implements OnInit {

  homeCourses!: Course[]

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
   this.getHomeCourse();
  }

  getHomeCourse(){
    this.courseService.getHomeCourses().subscribe(res => {
      this.homeCourses = res
    })
  }



}
