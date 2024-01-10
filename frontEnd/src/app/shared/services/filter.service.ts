import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constant } from 'src/app/core/constant/constant';
import { Course, categoryInterface, filterInterFace, instrctorModel } from '../interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  course!: Observable<Course[]>

  constructor(
    private http: HttpClient
  ) { }

  getInstructors(): Observable<instrctorModel[]> {
    return this.http.get<instrctorModel[]>(`${constant.baseUrl}/student/instructors`)
  }

  getCategory(): Observable<categoryInterface[]> {
    return this.http.get<categoryInterface[]>(`${constant.baseUrl}/student/categories`)
  }

  filterCourse(filterCredentials: filterInterFace): Observable<Course[]> {

    // Build the query parameters
    let params = new HttpParams();

    if (filterCredentials.rating !== undefined) {
      params = params.set('rating', filterCredentials.rating.toString());
    }

    if (filterCredentials.range !== undefined) {
      params = params.set('range', filterCredentials.range.toString());
    }

    if (filterCredentials.instructor !== undefined) {
      params = params.set('instructor', filterCredentials.instructor);
    }

    if (filterCredentials.category !== undefined) {
      params = params.set('category', filterCredentials.category);
    }

    if (filterCredentials.year !== undefined) {
      params = params.set('year', filterCredentials.year.toString());
    }
    console.log(params)

    return this.course = this.http.get<Course[]>(`${constant.baseUrl}/student/filter`, { params })
  }

  getAllCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(`${constant.baseUrl}/student/all-courses`)
  }

  searchCourse(searchText: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${constant.baseUrl}/student/search/${searchText}`)
  }





}
