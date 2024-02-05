import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ReviewRatingService } from '../services/review-rating.service';
import { studentJwtAuthGuard } from '../guards/student.guard';


@Controller('review-rating')
export class ReviewRatingController {

    constructor(
        private reviewRatingService: ReviewRatingService
    ) { }

    @UseGuards(studentJwtAuthGuard)
    @Post('')
    reviewAndRateCourse(
        @Body() data,
        @Request() req
    ) {
        return this.reviewRatingService.reviewAndRateCourse(data, req.user.id)
    }


}
