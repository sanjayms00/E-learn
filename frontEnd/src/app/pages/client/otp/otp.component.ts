import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IDeactivateComponent } from 'src/app/shared/services/exit-page-guard.service';
import { OtpVerify } from 'src/app/shared/store/actions/client.action';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
})
export class OtpComponent implements OnInit, OnDestroy, IDeactivateComponent {

  otp!: string
  minutes: number = 2;
  seconds: number = 0;
  resend: boolean = false;
  countdownInterval: any;
  clientMail: string | null

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<appState>
  ) {
    this.clientMail = localStorage.getItem("clientMail")
    if (!this.clientMail) this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
    console.log(this.clientMail)
    this.startCountdown();
  }


  verifyOtp() {
    if (this.clientMail) {
      const data = {
        email: this.clientMail,
        otp: Number(this.otp)
      }
      this.store.dispatch(OtpVerify(data))
    }
  }

  otpResend() {

  }

  onOtpChange(event: string) {
    this.otp = event
  }

  private startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  private stopCountdown(): void {
    clearInterval(this.countdownInterval);
  }

  private updateCountdown(): void {
    if (this.seconds > 0) {
      this.seconds--;
    } else if (this.minutes > 0) {
      this.minutes--;
      this.seconds = 59;
    } else {
      this.resend = true
      this.stopCountdown();
    }
  }

  canExit() {
    return confirm("are you sure, you want to exit")
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

}
