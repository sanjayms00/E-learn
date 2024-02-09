import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html'
})
export class ClientHomeComponent implements OnInit, OnDestroy {

  homeCourses!: Course[]
  homeCourseSubscription!: Subscription
  url: string = environment.cloudFrontUrl;

  constructor(
    private courseService: CourseService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getHomeCourse();
  }

  getHomeCourse() {
    this.homeCourseSubscription = this.courseService.getHomeCourses()
      .subscribe({
        next: res => {
          this.homeCourses = res
        },
        error: err => {
          this.toastr.error(err.message)
        }
      })
  }

  ngOnDestroy(): void {
    this.homeCourseSubscription.unsubscribe()
  }
}
