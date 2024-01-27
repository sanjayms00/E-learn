import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { instructorProfileType } from 'src/app/pages/instructor/instructor-profile/instructor-profile.component';

@Injectable({
  providedIn: 'root'
})
export class InstructorProfileService {

  constructor(
    private http: HttpClient
  ) { }

  InstructorProfileData() {
    return this.http.get<instructorProfileType>(`${constant.baseUrl}/instructor/profile`)
  }




}
