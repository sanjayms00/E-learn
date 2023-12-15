import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  getProfileData() {
    return this.http.get(`${constant.baseUrl}/profile`)
  }


}
