import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { constant } from '../constant/constant';
import { Observable } from 'rxjs';
import { loginInterface } from 'src/app/shared/interface/common.interface';
import { clientSignupInterface } from 'src/app/shared/interface/client.interface';
import { adminInterface } from 'src/app/shared/interface/admin.interface';



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
  registerStudent(signupData: clientSignupInterface): Observable<object>
  {
    return this.http.post<object>(`${constant.baseUrl}/student/signUp`, signupData)
  }


  //adminlogin api call
  adminLoginService(adminLoginData: loginInterface): Observable<object>
  {
    console.log('service', adminLoginData )
    return this.http.post<{admin : adminInterface}>(`${constant.baseUrl}/admin/login`, adminLoginData)
  }




}
