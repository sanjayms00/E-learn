import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.css']
})
export class InstructorCoursesComponent implements OnInit {

  courses!: Course[]

  constructor(
    private courseService: CourseService
  ){}


  ngOnInit(): void {
        this.courseService.getInstructorCourse().subscribe((res: any)=>{
          this.courses = res.files
        })
  }



}
