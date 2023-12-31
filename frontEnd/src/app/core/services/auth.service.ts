import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { constant } from '../constant/constant';
import { Observable } from 'rxjs';
import { SignUpInterface, loginInterface } from 'src/app/shared/interface/common.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  //login api call
  studentLogin(loginData: loginInterface) {
    return this.http.post(`${constant.baseUrl}/auth/login`, loginData)
  }

  //signup api call
  studentSignUp(signupData: SignUpInterface): Observable<object> {
    return this.http.post(`${constant.baseUrl}/auth/signUp`, signupData)
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
    return localStorage.removeItem("clientToken")
  }


  //logout client
  adminLogout() {
    return localStorage.removeItem("adminToken")
  }


  //logout client
  instructorLogout() {
    return localStorage.removeItem('instructorToken')
  }


  getLocalClientData() {
    if (this.getClientToken()) {
      return localStorage.getItem('clientData')
    }
    return null
  }


}
