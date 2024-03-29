import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../core/services/auth.service';
import { OtpVerify } from '../../../shared/store/actions/client.action';
import { appState } from '../../../shared/store/state/app.state';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
})
export class OtpComponent implements OnInit, OnDestroy {

  otp!: string
  minutes: number = 2;
  seconds: number = 0;
  resend: boolean = false;
  countdownInterval: any;
  clientMail: string | null

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store<appState>
  ) {
    this.clientMail = localStorage.getItem("clientMail")
    if (!this.clientMail) {
      this.router.navigateByUrl('/home')
    }
    console.log(this.clientMail)
  }

  ngOnInit(): void {
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
    if (this.clientMail) {
      this.authService.resendOtp(this.clientMail).subscribe(res => {
        console.log(res)
      })
      this.minutes = 2
      this.seconds = 0;
      this.startCountdown();
      this.resend = false;
    } else {
      alert("email is empty")
    }

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
