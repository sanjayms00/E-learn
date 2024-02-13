import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { Observable } from 'rxjs';
import { dashboardResponse } from 'src/app/shared/interface/admin.interface';


@Injectable({
  providedIn: 'root'
})
export class AdminDashBoardService {

  constructor(
    private http: HttpClient
  ) { }

  DashboardData(): Observable<dashboardResponse> {
    return this.http.get<dashboardResponse>(`${constant.baseUrl}/admin/dashboard`)
  }

}
