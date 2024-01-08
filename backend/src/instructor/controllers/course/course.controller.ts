import { Body, Controller, Get, InternalServerErrorException, Param, Post, Put, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, } from '@nestjs/platform-express';
import { CourseService } from 'src/instructor/services/course/course.service';

import { InstructorJwtAuthGuard } from 'src/instructor/guard/instructor.guard';

@Controller('api/instructor/')
export class CourseController {

    constructor(
        private readonly courseService: CourseService
    ) { }

    @UseGuards(InstructorJwtAuthGuard)
    @Post('createCourse')
    @UseInterceptors(FilesInterceptor('files')) // 'files' is the name of the field in FormData
    async createCourse(@UploadedFiles() files, @Body() formData, @Request() req) {
        const instructorId = req.user.id
        // console.log(files, formData, instructorId)
        return await this.courseService.uploadCourse(files, formData, instructorId);
    }

    // //add course
    // @UseGuards(InstructorJwtAuthGuard)
    // @Post('add-course')
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'imageFile', maxCount: 1 },
    //     { name: 'videoFile', maxCount: 1 },
    // ]))
    // async addCourse(
    //     @UploadedFiles() files: { imageFile: Express.Multer.File[], videoFile: Express.Multer.File[] },
    //     @Body() otherData,
    //     @Request() req
    // ) {
    //     const instructorId = req.user.id
    //     return await this.courseService.uploadCourse(files, otherData, instructorId);
    // }


    //update course
    @UseGuards(InstructorJwtAuthGuard)
    // @UseInterceptors(FileFieldsInterceptor([
    //     { name: 'imageFile', maxCount: 1 },
    //     { name: 'videoFile', maxCount: 1 },
    // ]))




    @Put('update-course')
    async updateCourse(
        // @UploadedFiles() files: { imageFile: Express.Multer.File[], videoFile: Express.Multer.File[] },
        @Body() otherData
    ) {

        console.log("otherData", otherData)

        return await this.courseService.updateCourse(otherData);
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
    @Get('edit-course/:id')
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
