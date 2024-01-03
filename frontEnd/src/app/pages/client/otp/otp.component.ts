import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDeactivateComponent } from 'src/app/shared/services/exit-page-guard.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html'
})
export class OtpComponent implements OnInit, OnDestroy, IDeactivateComponent {

  email = "demo@gmail.com"
  otpForm!: FormGroup
  minutes: number = 2;
  seconds: number = 0;
  private countdownInterval: any;


  constructor(
    private fb: FormBuilder
  ) {
    this.otpForm = this.fb.group({
      otp: ['']
    })
  }

  ngOnInit(): void {
    this.startCountdown();
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
      // Countdown is complete, you can perform any action here
      this.stopCountdown();
    }
  }

  otpSubmit() {
    alert("otp submitted")
  }

  otpResend() {
    alert("otp resend")
  }

  canExit() {
    return confirm("are you sure, you want to exit")
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

}
