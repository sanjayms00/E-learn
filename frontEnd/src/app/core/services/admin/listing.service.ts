import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { constant } from "../../constant/constant";
import { Observable } from "rxjs";
import { instructorInterface, studentInterface } from "src/app/shared/interface/common.interface";
import { statusInterface } from "src/app/shared/interface/admin.interface";


@Injectable({
    providedIn: 'root'
})
export class ListingService {

    constructor(
        private http: HttpClient
    ) { }


    getStudentList(): Observable<studentInterface[]> {
        return this.http.get<studentInterface[]>(`${constant.baseUrl}/admin/client/students`)

    }

    getInstructorList(): Observable<instructorInterface[]> {
        return this.http.get<instructorInterface[]>(`${constant.baseUrl}/admin/client/instructors`)
    }


    changeClientStatus(data: statusInterface){
        return this.http.patch(`${constant.baseUrl}/admin/clients/status`, data)
    }




}