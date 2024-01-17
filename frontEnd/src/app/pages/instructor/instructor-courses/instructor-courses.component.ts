import { Component, OnInit } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html'
})
export class InstructorCoursesComponent implements OnInit {

  courses: Course[] = []
  thumbnail = constant.thumbnail


  constructor(
    private courseService: CourseService
  ) { }


  ngOnInit(): void {
    this.courseService.getInstructorCourse().subscribe((res: any) => {
      console.log(res)
      this.courses = res
    })
  }



}
