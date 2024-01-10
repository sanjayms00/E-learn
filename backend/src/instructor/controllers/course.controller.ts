import { Body, Controller, Get, InternalServerErrorException, Param, Post, Put, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, } from '@nestjs/platform-express';
import { CourseService } from 'src/instructor/services/course.service';

import { InstructorJwtAuthGuard } from 'src/instructor/guard/instructor.guard';
import { stringify } from 'querystring';
import { CourseData } from 'src/common/interfaces/course.interface';

@Controller('instructor/')
export class CourseController {

    constructor(
        private readonly courseService: CourseService
    ) { }

    @UseGuards(InstructorJwtAuthGuard)
    @Post('createCourse')
    @UseInterceptors(FilesInterceptor('files')) //recieve file data, all file names are files
    async createCourse(@UploadedFiles() files, @Body() formData, @Request() req) {
        const instructorId = req.user.id
        return await this.courseService.uploadCourse(files, formData, instructorId);
    }


    @UseGuards(InstructorJwtAuthGuard)
    @Post('updateCourse')
    @UseInterceptors(FilesInterceptor('files')) //recieve file data, all file names are files
    async updateCourse(@UploadedFiles() files, @Body() formData: CourseData, @Request() req) {
        const instructorId = req.user.id
        // console.log(files,formData, instructorId)
        return await this.courseService.updateCourse(files, formData, instructorId);
    }







    //instructor courses
    @UseGuards(InstructorJwtAuthGuard)
    @Get("courses")
    async getInstructorCourse(
        @Request() req
    ) {
        const instructorId = req.user.id
        console.log(instructorId)
        if (instructorId) {
            const files = await this.courseService.getInstructorCourse(instructorId);
            return { files };
        } else {
            throw new InternalServerErrorException()
        }
    }

    //get instructor course to edit
    @Get('editCourse/:id')
    async editCourse(
        @Param('id') id: string
    ) {
        return await this.courseService.editCourse(id)
    }


    @Get('delete-course/:id')
    async deleteCourse(
        @Param('id') id: string
    ) {
        return await this.courseService.deleteCourse(id)
    }



    // @Get('course/:key')
    // async serveFile(@Param('key') key: string, @Res() res: Response) {
    //     const stream = await this.courseService.getFile(key)
    //     stream.pipe(res);
    // }


}
