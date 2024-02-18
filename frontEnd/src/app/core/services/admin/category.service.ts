import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { Observable } from 'rxjs';
import { categoryInterface } from 'src/app/shared/interface/common.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  addCategory(data: {category: string}) {
    return this.http.post(`${constant.baseUrl}/admin/category/addCategory`, data)
  }

  getCategories(): Observable<categoryInterface[]> {
    return this.http.get<categoryInterface[]>(`${constant.baseUrl}/admin/category/allCategories`)
  }

  getActiveCategories(): Observable<categoryInterface[]> {
    return this.http.get<categoryInterface[]>(`${constant.baseUrl}/admin/category/activeCategories`)
  }

  removeCategory(): Observable<object> {
    return this.http.put(`${constant.baseUrl}/admin/catrgory/removeCategory`, {})
  }

}
