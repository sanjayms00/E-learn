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
  studentLogin(loginData: loginInterface): Observable<object>
  {
    return this.http.post<object>(`${constant.baseUrl}/student/login`, loginData)
  }

  //signup api call
  studentSignUp(signupData: SignUpInterface): Observable<object>
  {
    return this.http.post<object>(`${constant.baseUrl}/student/signUp`, signupData)
  }

  //adminlogin api call
  adminLogin(adminLoginData: loginInterface): Observable<{token : string}>
  {
    return this.http.post<{token : string}>(`${constant.baseUrl}/admin/login`, adminLoginData)
  }

  //get client token
  getClientToken(): string | null
  {
    return localStorage.getItem('clientToken')
  }

  //get admin token
  getAdminToken(): string | null
  {
    return localStorage.getItem('adminToken')
  }

  //logout client
  clientLogout(){
    
  }

  //check client logged in
  IsClientloggedIn():  string | null
  {
    return localStorage.getItem('clientToken')
  }

  //check admin logged in
  IsAdminloggedIn(): string | null
  {
    return localStorage.getItem('clientToken')
  }

}
