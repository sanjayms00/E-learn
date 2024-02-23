import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../core/services/instructor/course.service';
import { homeInterface } from '../../../shared/interface/client.interface';


@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html'
})
export class ClientHomeComponent implements OnInit {

  homeData: homeInterface = {
    courses: [],
    allCounts: { courseCount: 0, categoryCount: 0, ratingCount: 0, instructorCount: 0, studentCount: 0 }
  };

  constructor(
    private courseService: CourseService,
    private toastr: ToastrService,
    private desctroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.courseService.homeData()
      .pipe(takeUntilDestroyed(this.desctroyRef))
      .subscribe({
        next: res => {
          this.homeData = res
        },
        error: err => {
          console.log(err)
        }
      })
  }

}
