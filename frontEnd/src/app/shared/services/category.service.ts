import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { categories } from '../interface/common.interface';
import { Observable } from 'rxjs';
import { constant } from '../../core/constant/constant';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClient
    ) { }

    getCategories(): Observable<categories[]> {
        return this.http.get<categories[]>(`${constant.baseUrl}/student/categories/all`)
    }
}
