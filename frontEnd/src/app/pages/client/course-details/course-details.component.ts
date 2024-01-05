import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
})
export class CourseDetailsComponent implements OnInit {

  thumbnail = constant.thumbnail
  courseDetails: Course = {
    _id: '',
    courseName: '',
    slug: '',
    description: '',
    price: '',
    estimatedPrice: '',
    thumbnail: '',
    updatedAt: new Date(),
    createdAt: new Date()
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    if (id) {
      this.courseService.courseDetails(id)
        .subscribe((res: Course) => {
          this.courseDetails = res
        })
    } else {
      alert("Unable to show the details")
    }



  }



}
