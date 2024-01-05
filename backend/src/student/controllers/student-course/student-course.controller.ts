import { Controller, Get, Param, Query } from '@nestjs/common';
import { StudentCourseService } from 'src/student/services/student-course/student-course.service';

@Controller('api/student/')
export class StudentCourseController {

    constructor(
        private studentCourseService: StudentCourseService
    ) { }

    @Get('home-courses')
    async getLimittedCourse() {
        return await this.studentCourseService.getLimitedCourse()
    }

    @Get('all-courses')
    async getAllCourse() {
        return await this.studentCourseService.getAllCourse()
    }

    @Get('search/:searchText')
    async searchCourse(@Param('searchText') searchText) {
        return await this.studentCourseService.searchCourse(searchText)
    }

    @Get('course-details/:id')
    async courseDetails(@Param('id') id) {
        return await this.studentCourseService.courseDetails(id)
    }

    @Get('instructors')
    async getInstructors() {
        return await this.studentCourseService.getInstructors()
    }

    @Get('categories')
    async getcategories() {
        return await this.studentCourseService.getCategories()
    }

    @Get('filter')
    async filterCourse(
        @Query('rating') rating?: number,
        @Query('range') range?: number,
        @Query('instructor') instructor?: number,
        @Query('category') category?: number,
        @Query('year') year?: number,
    ) {
        const filterCredentials = {
            rating,
            range,
            instructor,
            category,
            year,
        };
        return await this.studentCourseService.getFilteredCourses(filterCredentials)
        
    }


}
