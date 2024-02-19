import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CourseService } from '../../../core/services/instructor/course.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CourseDetail } from '../../../shared/interface/courseDetails.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {

  id: string | null;
  courseContent!: CourseDetail
  courseSubscription!: Subscription
  isButtonClicked = false;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private courseService: CourseService,
    private destroyRef: DestroyRef,
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    if (this.id?.trim()) {
      //get course data
      this.courseSubscription = this.courseService.courseDetails(this.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            this.courseContent = res
          },
          error: err => {
            this.toastr.error(err)
          }
        })
    }
    else {
      this.toastr.error("id is not found")
    }
  }


  paymentBtnClick() {

    this.isButtonClicked = true;
    this.courseService.checkout(this.courseContent)
  }


  ngOnDestroy(): void {
    this.courseSubscription.unsubscribe()
  }

}
