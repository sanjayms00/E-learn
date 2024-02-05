import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { LearningService } from 'src/app/core/services/client/learning.service';
import { RatingReviewService } from 'src/app/core/services/client/rating-review.service';
import { myLearning } from 'src/app/shared/interface/myLearning.interface';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['/my-learning.component.css']
})
export class MyLearningComponent implements OnInit {

  myCourse!: myLearning[]
  visible = false;
  url = environment.cloudFrontUrl;
  rating!: number;
  review!: string;
  modalCourseName = ''
  modalInstructorName = ''
  modalCourseId = ''
  student!: any
  studentId!: string

  constructor(
    private learningService: LearningService,
    private toastr: ToastrService,
    private ratingReviewService: RatingReviewService,
    private destroyRef: DestroyRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getMyCourses()
    this.student = this.authService.getLocalClientData()
    if (this.student)
      this.studentId = JSON.parse(this.student)._id
  }

  //get the purchased courses.
  getMyCourses() {
    this.learningService.getMyCourses()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.myCourse = res;
        },
        error: (err) => {
          this.toastr.error(err);
        }
      });
  }

  //modal open  
  showDialog(courseId: string, courseName: string, instructorName: string) {
    this.visible = true;
    this.modalCourseName = courseName
    this.modalInstructorName = instructorName
    this.modalCourseId = courseId
  }

  modalSubmit() {
    if (this.rating > 0 && this.review !== '') {
      this.visible = false
      this.ratingReviewService.rateReviewCourse(this.modalCourseId, this.rating, this.review)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (res: any) => {
            // console.log(res)
            this.modalCourseName = ''
            this.modalInstructorName = ''
            this.modalCourseId = ''
            this.myCourse = res;
            this.toastr.success("Review added")
          },
          error: (err: any) => {
            this.toastr.error(err.message)
          }
        })
      this.rating = 0
      this.review = ''
    } else {
      this.toastr.error("Fill all the fields")
    }


  }



  checkStudent(reviews: any) {
    if (reviews.length < 1) return false

    const data = reviews.some((review: any) => review.studentId === this.studentId)

    if (data) {
      return true
    } else {
      return false
    }


  }




}
