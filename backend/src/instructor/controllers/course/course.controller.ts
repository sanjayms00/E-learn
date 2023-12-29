import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from 'src/instructor/services/course/course.service';

@Controller('api/instructor')
export class CourseController {

    constructor(
        private readonly courseService: CourseService
    ){}

    @Post('/add-course')
    @UseInterceptors(FileInterceptor('file'))
    async addCourse(@UploadedFile() file: Express.Multer.File){
        await this.courseService.uploadCourse(file.originalname, file.buffer)
    }

    @Post('/all-course')
    getAllCourse(){

    }


}
