import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { constant } from "../../constant/constant";
import { Observable, catchError, throwError } from "rxjs";
import { clientInterface } from "src/app/shared/interface/common.interface";


@Injectable({
    providedIn: 'root'
})
export class ListingService {

    constructor(
        private http: HttpClient
    ) { }

    getStudentList(): Observable<clientInterface[]> {
        return this.http.get<clientInterface[]>(`${constant.baseUrl}/admin/students`)

    }

    getInstructorList(): Observable<clientInterface[]> {
        return this.http.get<clientInterface[]>(`${constant.baseUrl}/admin/instructors`)
    }


    changeClientStatus(data: string): Observable<Object> {
        return this.http.patch<clientInterface[]>(`${constant.baseUrl}/admin/students/status`, data)
    }




}