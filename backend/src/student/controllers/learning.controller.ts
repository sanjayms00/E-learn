import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { LearningService } from '../services/learning.service';
import { studentJwtAuthGuard } from '../guards/student.guard';

@Controller('learning')
export class LearningController {

    constructor(
        private learningService: LearningService
    ) { }

    @UseGuards(studentJwtAuthGuard)
    @Get('my-courses')
    getMyCourses(@Request() req) {

        const studentId = req.user._id
        return this.learningService.getMyCourses(studentId)

    }

    @UseGuards(studentJwtAuthGuard)
    @Get('get-video/:videoId')
    getVideo(@Request() req, @Param('videoId') videoId: string) {
        console.log(videoId)
        const studentId = req.user._id
        return this.learningService.getVideo(videoId)
    }



}
