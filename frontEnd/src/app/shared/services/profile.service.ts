import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';
import { Observable, map } from 'rxjs';
import { instructorInterface, studentInterface } from 'src/app/shared/interface/common.interface';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(
        private http: HttpClient
    ) { }

    getProfileData() {
        return this.http.get(`${constant.baseUrl}/student/profile`)
    }

    updateProfile(profileData: FormData): Observable<studentInterface> {
        return this.http.put<studentInterface>(`${constant.baseUrl}/student/profile/update`, profileData)
    }

    updateInstructorProfile(profileData: any): Observable<instructorInterface> {
        return this.http.put<instructorInterface>(`${constant.baseUrl}/instructor/profile/update`, profileData)
    }

}