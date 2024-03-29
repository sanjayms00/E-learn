import { Component, DestroyRef, ElementRef, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { CourseService } from '../../../core/services/instructor/course.service';
import { studentInterface } from '../../../shared/interface/common.interface';
import { CourseDetail, initialCourseDetails } from '../../../shared/interface/courseDetails.interface';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  student!: studentInterface;
  visible: boolean = false;
  courseDetails: CourseDetail = initialCourseDetails;
  averageRating = 0
  individualStars = new Map()
  p: number = 1;

  @ViewChild('trailerVideo') trailerVideo!: ElementRef

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private destroyRef: DestroyRef,
    private authSservice: AuthService,
    private toastr: ToastrService
  ) {
    for (let i = 1; i <= 5; i++) {
      this.individualStars.set(i, 0);
    }
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.getStudent();
      this.getCourseData(id);
    } else {
      alert("Unable to show the details")
    }
  }

  showDialog() {
    this.visible = true;
  }

  //fetch course Data
  getCourseData(id: string) {
    this.courseService.courseDetails(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        {
          next: res => {
            this.courseDetails = res
            this.calculateRating()
          },
          error: (err: any) => {
            console.log(err)
          }
        })
  }

  //get student Data from local
  getStudent() {
    const studentData = this.authSservice.getLocalClientData()
    if (studentData) {
      this.student = JSON.parse(studentData)
    }
  }

  isStudentEnrolled(): boolean | undefined {
    return this.courseDetails?.students?.includes(this.student._id);
  }

  calculateRating() {
    let totalRating = 0
    this.courseDetails.ratingreview.forEach(element => {
      const rating = element.reviewData.rating
      this.individualStars.set(rating, (this.individualStars.get(rating) || 0) + 1)

      totalRating += rating
    });

    const noOfReviews = this.courseDetails.ratingreview.length

    this.averageRating = totalRating / noOfReviews
  }


}
