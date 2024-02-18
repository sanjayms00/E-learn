import { Injectable } from '@angular/core';
import { constant } from '../../constant/constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myLearning } from 'src/app/shared/interface/myLearning.interface';

@Injectable({
  providedIn: 'root'
})
export class RatingReviewService {

  constructor(
    private http: HttpClient
  ) { }

  rateReviewCourse(courseId: string, rating: number, review: string): Observable<myLearning[]>  {
    const requestBody = {
      courseId,
      rating,
      review
    };
    return this.http.post<myLearning[]>(`${constant.baseUrl}/student/review-rating`, requestBody)
  }

}
