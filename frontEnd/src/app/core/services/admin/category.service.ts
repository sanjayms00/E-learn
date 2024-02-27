import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { Observable } from 'rxjs';
import { categoryInterface } from '../../../shared/interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  addCategory(data: { category: string }): Observable<categoryInterface[]> {
    return this.http.post<categoryInterface[]>(`${constant.baseUrl}/admin/category/addCategory`, data)
  }

  getCategories(): Observable<categoryInterface[]> {
    return this.http.get<categoryInterface[]>(`${constant.baseUrl}/admin/category/allCategories`)
  }

  getActiveCategories(): Observable<categoryInterface[]> {
    return this.http.get<categoryInterface[]>(`${constant.baseUrl}/admin/category/activeCategories`)
  }

  removeCategory(categoryId: string): Observable<categoryInterface[]> {
    return this.http.delete<categoryInterface[]>(`${constant.baseUrl}/admin/category/removeCategory/${categoryId}`)
  }

}
