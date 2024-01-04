import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(
    private http: HttpClient
  ) { }

  getInstructors() {
    return this.http.get(`${constant.baseUrl}/students/instructors`)
  }




}
