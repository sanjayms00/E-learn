import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { Observable } from 'rxjs';
import { instructorDashboardInterface } from '../../../shared/interface/dashboard.interface';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getDashboardData(): Observable<instructorDashboardInterface> {
    return this.http.get<instructorDashboardInterface>(`${constant.baseUrl}/instructor/dashboard`)
  }

}
