import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Query, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, } from '@nestjs/platform-express';
import { CourseService } from 'src/instructor/services/course.service';

import { InstructorJwtAuthGuard } from 'src/instructor/guard/instructor.guard';
import { CourseData } from 'src/common/interfaces/course.interface';

@Controller('instructor')
export class InstructorCourseController {

    constructor(
        private readonly courseService: CourseService
    ) { }


    //create a course
    @UseGuards(InstructorJwtAuthGuard)
    @Post('createCourse')
    @UseInterceptors(FilesInterceptor('files'))
    async createCourse(@UploadedFiles() files, @Body() formData, @Request() req) {
        const instructorId = req.user.id
        return await this.courseService.uploadCourse(files, formData, instructorId);
    }


    //update course information
    @UseGuards(InstructorJwtAuthGuard)
    @Post('update-course-information')
    @UseInterceptors(FilesInterceptor('files'))
    async updateCourseInformation(@UploadedFiles() files, @Body() formData: CourseData, @Request() req) {
        const instructorId = req.user.id
        return await this.courseService.updateCourseInformation(files, formData, instructorId);
    }

    //update chapter by one
    @UseGuards(InstructorJwtAuthGuard)
    @Post('update-single-chapter')
    @UseInterceptors(FilesInterceptor('files'))
    async updateSingleChapter(@UploadedFiles() files, @Body() formData: CourseData, @Request() req) {
        const instructorId = req.user.id
        return await this.courseService.updateSingleChapter(files, instructorId, formData);
    }


    // add new chapter to existing course
    @UseGuards(InstructorJwtAuthGuard)
    @Post('update-course-content')
    @UseInterceptors(FilesInterceptor('files'))
    async updateCourseContent(@UploadedFiles() files, @Body() formData: CourseData, @Request() req) {
        const instructorId = req.user.id
        return await this.courseService.updateCourseContent(files, formData, instructorId);
    }

    //instructor courses
    @UseGuards(InstructorJwtAuthGuard)
    @Get("courses")
    async getInstructorCourse(@Request() req) {
        const instructorId = req.user.id
        if (instructorId) {
            return await this.courseService.getInstructorCourse(instructorId);
        } else {
            throw new NotFoundException("Intstructor id not found")
        }
    }

    //get instructor course to edit
    @Get('editCourse/:id')
    async editCourse(
        @Param('id') id: string
    ) {
        return await this.courseService.editCourse(id)
    }

    //get instructor course content to edit
    @Get('editCourseContent/:id')
    async editCourseContent(
        @Param('id') id: string
    ) {
        return await this.courseService.editCourseContent(id)
    }

    //delete a course
    @UseGuards(InstructorJwtAuthGuard)
    @Delete('delete-course/:id')
    async deleteCourse(
        @Param('id') courseId: string,
        @Request() req
    ) {
        const instructorId = req.user.id
        if (instructorId) {
            return await this.courseService.deleteCourse(courseId, instructorId)
        } else {
            throw new NotFoundException("Intstructor id not found")
        }
    }

    // add new chapter to existing course
    @UseGuards(InstructorJwtAuthGuard)
    @Delete('delete-chapter')
    async deleteChapter(@Query('videoId') videoId: string) {

        return await this.courseService.deleteChapter(videoId);
    }

}
