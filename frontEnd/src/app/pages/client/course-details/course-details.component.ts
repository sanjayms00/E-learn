import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constant } from 'src/app/core/constant/constant';
import { AuthService } from 'src/app/core/services/auth.service';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course, studentInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
})
export class CourseDetailsComponent implements OnInit {

  student: any;
  courseDetails: Course = {
    _id: '',
    courseName: '',
    slug: '',
    description: '',
    price: 0,
    students: [],
    estimatedPrice: '',
    thumbnail: '',
    updatedAt: new Date(),
    createdAt: new Date()
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authSservice: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.getStudent();
      this.getCourseData(id);
    } else {
      alert("Unable to show the details")
    }
  }

  //fetch course Data
  getCourseData(id: string) {
    this.courseService.courseDetails(id)
      .subscribe((res: Course) => {
        this.courseDetails = res
      })
  }

  //get student Data from local
  getStudent() {
    const studentData = this.authSservice.getLocalClientData()
    if (studentData) {
      this.student = JSON.parse(studentData)
    }
    console.log(this.student._id)
  }

  isStudentEnrolled(): boolean | undefined {
    return this.courseDetails?.students?.includes(this.student._id);
  }


}
