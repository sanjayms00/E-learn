import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(
    private http: HttpClient
  ) {}


  verifyOtpService(otp: number) {
    return this.http.post(`${constant.baseUrl}/`, {otp})
  }

  resendOtpService(email: string) {
    return this.http.post(`${constant.baseUrl}/`, {otp})
  }
}
