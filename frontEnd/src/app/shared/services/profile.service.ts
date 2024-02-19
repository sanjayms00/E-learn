import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constant } from 'src/app/core/constant/constant';
import { Observable } from 'rxjs';
import { instructorInterface, studentInterface } from 'src/app/shared/interface/common.interface';

type profileResponse = {
    instructorData: instructorInterface
    imageSignedUrl: string
}

type profileStudentResponse = {
    studentData: studentInterface
    imageSignedUrl: string
}

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

    updateProfile(profileData: FormData): Observable<profileStudentResponse> {
        return this.http.put<profileStudentResponse>(`${constant.baseUrl}/student/profile/update`, profileData)
    }

    updateInstructorProfile(profileData: any): Observable<profileResponse> {
        return this.http.put<profileResponse>(`${constant.baseUrl}/instructor/profile/update`, profileData)
    }


    profileImage(imageData: string): Observable<{ profileImage : string}> {
        return this.http.get<{ profileImage: string }>(`${constant.baseUrl}/instructor/profile/image?image=${imageData}`);
    }
    
    studentprofileImage(imageData: string): Observable<{ profileImage : string}> {
        return this.http.get<{ profileImage: string }>(`${constant.baseUrl}/student/profile/image?image=${imageData}`);
    }




}