import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from "@angular/common/http";
import { constant } from '../constant/constant';
import { Observable } from 'rxjs';
import { SignUpInterface, loginInterface, studentInterface } from 'src/app/shared/interface/common.interface';
import { clientStateInterface } from 'src/app/shared/interface/client.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //login api call
  studentLogin(loginData: loginInterface): Observable<{ user: clientStateInterface, accessToken: string }> {
    return this.http.post<{ user: clientStateInterface, accessToken: string }>(`${constant.baseUrl}/student/auth/login`, loginData)
  }

  //signup api call
  studentSignUp(signupData: SignUpInterface) {
    return this.http.post<{ email: string }>(`${constant.baseUrl}/student/auth/signUp`, signupData)
  }

  //login api call instructor
  instructorLogin(loginData: loginInterface) {
    return this.http.post(`${constant.baseUrl}/instructor/auth/login`, loginData)
  }

  //signup api call instructor
  instructorSignUp(signupData: SignUpInterface): Observable<object> {
    return this.http.post(`${constant.baseUrl}/instructor/auth/signUp`, signupData)
  }

  //adminlogin api call
  adminLogin(adminLoginData: loginInterface): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${constant.baseUrl}/admin/auth/login`, adminLoginData)
  }

  //get client token
  getClientToken(): string | null {
    const token = localStorage.getItem('clientToken');
    return token !== null ? token : null;
  }

  //get client token
  getInstructorToken(): string | null {
    const token = localStorage.getItem('instructorToken');
    return token !== null ? token : null;
  }

  //get admin token
  getAdminToken(): string | null {
    const token = localStorage.getItem('adminToken');
    return token !== null ? token : null;
  }

  //logout client
  clientLogout() {
    localStorage.removeItem("clientData")
    return localStorage.removeItem("clientToken")
  }

  //logout client
  adminLogout() {
    return localStorage.removeItem("adminToken")
  }

  //logout client
  instructorLogout() {
    localStorage.removeItem('instructorData')
    return localStorage.removeItem('instructorToken')
  }

  //local student Data
  getLocalClientData() {
    if (this.getClientToken()) {
      return localStorage.getItem('clientData')
    }
    return null
  }

  //verify otp
  verifyotp(data: { email: string | null, otp: number }): Observable<{ user: studentInterface, access_token: string }> {
    return this.http.put<{ user: studentInterface, access_token: string }>(`${constant.baseUrl}/student/auth/verifyOtp`, data)
  }

  //resend otp
  resendOtp(email: string) {
    console.log(email)
    return this.http.put(`${constant.baseUrl}/student/auth/resendOtp`, { email })
  }

  //forgot password
  forgotPassword(email: string) {
    return this.http.post<{ status: HttpStatusCode }>(`${constant.baseUrl}/student/auth/forgotPassword`, { email })
  }

  //reset password
  resetPassword(token: string, password: string) {
    return this.http.post<{ status: boolean, message: string }>(`${constant.baseUrl}/student/auth/resetPassword`, { token, password })
  }





}
