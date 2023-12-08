import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { constant } from "../../constant/constant";
import { Observable } from "rxjs";
import { clientInterface } from "src/app/shared/interface/common.interface";


@Injectable({
    providedIn: 'root'
})
export class studentListService {

    constructor(
        private http: HttpClient
        ){}

    getStudentList() : Observable<clientInterface[]>
    {
        return this.http.get<clientInterface[]>(`${constant.baseUrl}/admin/students`)
    }
}