import { Body, Controller, Post } from '@nestjs/common';
import { ReviewRatingService } from '../services/review-rating.service';


@Controller('review-rating')
export class ReviewRatingController {

    constructor(
        private reviewRatingService: ReviewRatingService
    ) { }


    @Post()
    reviewAndRateCourse(
        @Body() data
    ) {
        console.log(data)
        this.reviewRatingService.reviewAndRateCourse()
    }


}
