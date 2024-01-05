import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  id: string | null;
  courseContent: Course | undefined = undefined
  courseSubscription!: Subscription
  thumbnail = constant.thumbnail
  isButtonClicked = false;
  selectedPaymentOption: string = ''

  //constructor
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private courseService: CourseService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    if (this.id?.trim()) {
      //get course data
      this.courseSubscription = this.courseService.courseDetails(this.id).subscribe(res => {
        this.courseContent = res
      })
    }
    else {
      this.toastr.error("id is not found")
    }
  }

  paymentMethodChange(option: string) {
    console.log(option)
  }


  paymentBtnClick() {

    if (this.selectedPaymentOption === 'stripe') {

      this.isButtonClicked = true;
    }

  }


  ngOnDestroy(): void {
    this.courseSubscription.unsubscribe()
  }






}
