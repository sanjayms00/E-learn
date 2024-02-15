import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { homeResponse } from 'src/app/shared/interface/common.interface';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html'
})
export class ClientHomeComponent implements OnInit, OnDestroy {

  homeData: homeResponse = {
    courses: [],
    allCounts: {
      courseCount: 0,
      categoryCount: 0,
      ratingCount: 0,
      instructorCount: 0,
      studentCount: 0
    }
  }
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
    this.homeCourseSubscription = this.courseService.homeData()
      .subscribe({
        next: res => {
          this.homeData = res
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
