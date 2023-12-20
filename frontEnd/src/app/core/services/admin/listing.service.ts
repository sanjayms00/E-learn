import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { constant } from "../../constant/constant";
import { Observable } from "rxjs";
import { clientInterface } from "src/app/shared/interface/common.interface";
import { statusInterface } from "src/app/shared/interface/admin.interface";


@Injectable({
    providedIn: 'root'
})
export class ListingService {

    constructor(
        private http: HttpClient
    ) { }

    getClientList(): Observable<clientInterface[]> {
        return this.http.get<clientInterface[]>(`${constant.baseUrl}/admin/clients`)
    }

    // getStudentList(): Observable<clientInterface[]> {
    //     return this.http.get<clientInterface[]>(`${constant.baseUrl}/admin/students`)

    // }

    // getInstructorList(): Observable<clientInterface[]> {
    //     return this.http.get<clientInterface[]>(`${constant.baseUrl}/admin/instructors`)
    // }


    changeClientStatus(data: statusInterface){
        return this.http.patch(`${constant.baseUrl}/admin/clients/status`, data)
    }




}