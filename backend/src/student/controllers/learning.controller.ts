import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { LearningService } from '../services/learning.service';
import { studentJwtAuthGuard } from '../guards/student.guard';

@Controller('learning')
export class LearningController {

    constructor(
        private learningService: LearningService
    ) { }

    //student courses
    @UseGuards(studentJwtAuthGuard)
    @Get('my-courses')
    getMyCourses(@Request() req) {
        const studentId = req.user._id
        return this.learningService.getMyCourses(studentId)
    }

    //stream the course
    @UseGuards(studentJwtAuthGuard)
    @Get('stream-course')
    streamCourseData(
        @Request() req,
        @Query('courseId') courseId: string,
        @Query('videoId') videoId: string
    ) {
        const studentId = req.user._id
        console.log(courseId, videoId, studentId)
        return this.learningService.streamCourseData(courseId, videoId, studentId)
    }

}
