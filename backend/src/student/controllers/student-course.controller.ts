import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { studentJwtAuthGuard } from 'src/student/guards/student.guard';
import { StudentCourseService } from 'src/student/services/student-course.service';

@Controller('student')
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
        @Query('level') level?: string,
        @Query('instructor') instructor?: number,
        @Query('category') category?: number,
    ) {
        const filterCredentials = {
            level,
            instructor,
            category,
        };

        console.log(filterCredentials)

        return await this.studentCourseService.getFilteredCourses(filterCredentials)

    }

    @UseGuards(studentJwtAuthGuard)
    @Post('checkout')
    async checkout(@Body() courseData, @Request() req) {
        console.log(req.user._id)
        return await this.studentCourseService.checkout(courseData, req.user._id)
    }


}
