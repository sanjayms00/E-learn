import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { constant } from 'src/app/core/constant/constant';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { Course } from 'src/app/shared/interface/common.interface';

import { StripeService } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environment/environment';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit, OnDestroy {

  id: string | null;
  courseContent!: Course
  courseSubscription!: Subscription
  isButtonClicked = false;


  //constructor
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private courseService: CourseService,
    private http: HttpClient,
    private stripeService: StripeService,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    if (this.id?.trim()) {
      //get course data
      this.courseSubscription = this.courseService.courseDetails(this.id).subscribe(res => {
        this.courseContent = res
        console.log(this.courseContent)
      })
    }
    else {
      this.toastr.error("id is not found")
    }
  }


  paymentBtnClick() {

    this.isButtonClicked = true;
    // this.courseService.checkout(this.courseContent).subscribe(res => {
    //   console.log(res)
    //   this.router.navigateByUrl('/learning')
    // })
    this.http.post(`${constant.baseUrl}/student/checkout`, {
      course: this.courseContent
    }).subscribe(async (res: any) => {
      console.log("response", res)
      console.log("response", res.id)
      const stripe = await loadStripe(environment.stripe.publicKey);
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }


  ngOnDestroy(): void {
    this.courseSubscription.unsubscribe()
  }






}
