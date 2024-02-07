import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/CourseService';
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
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.getHomeCourse();
  }

  getHomeCourse() {
    this.homeCourseSubscription = this.courseService.getHomeCourses()
      .subscribe(res => {
        this.homeCourses = res
      })
  }


  ngOnDestroy(): void {
    this.homeCourseSubscription.unsubscribe()
  }

}
