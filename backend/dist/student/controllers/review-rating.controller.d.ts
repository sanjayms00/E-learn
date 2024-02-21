import { ReviewRatingService } from '../services/review-rating.service';
export declare class ReviewRatingController {
    private reviewRatingService;
    constructor(reviewRatingService: ReviewRatingService);
    reviewAndRateCourse(data: any, req: any): Promise<any[]>;
}
