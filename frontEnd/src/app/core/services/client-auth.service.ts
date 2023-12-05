import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { constant } from '../constant/constant';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientAuthService {

  constructor(private http: HttpClient) { }

  studentLogin(loginData: {email: string, password : string}): Observable<object>
  {
    return this.http.post(`${constant.baseUrl}/auth/login`, loginData)
  }




}
