import { Controller, Get, Param } from '@nestjs/common';
import { StudentCourseService } from 'src/student/services/student-course/student-course.service';

@Controller('api/student/')
export class StudentCourseController {


    constructor(
        private studentCourseService: StudentCourseService
    ) { }

    @Get('home-courses')
    getLimittedCourse() {
        return this.studentCourseService.getLimitedCourse()
    }

    @Get('all-courses')
    getAllCourse() {
        return this.studentCourseService.getAllCourse()
    }

    @Get('search/:searchText')
    searchCourse(@Param('searchText') searchText) {
        return this.studentCourseService.seatchCourse(searchText)
    }


}
