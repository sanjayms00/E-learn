import { Body, Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor,  } from '@nestjs/platform-express';
import { CourseService } from 'src/instructor/services/course/course.service';

import { Response } from 'express';

@Controller('api/instructor')
export class CourseController {

    constructor(
        private readonly courseService: CourseService
    ){}

    @Post('/add-course')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'imageFile', maxCount: 1 },
        { name: 'videoFile', maxCount: 1 },
      ]))
    async addCourse(
        @UploadedFiles() files: { imageFile: Express.Multer.File[], videoFile: Express.Multer.File[]},
        @Body() otherData
        ) {
            
        return await this.courseService.uploadCourse(files, otherData);
    }   

  

    // }
    @Get('/course/:key')
    async serveFile(@Param('key') key: string, @Res() res: Response) {
       const stream = await this.courseService.getFile(key)
       stream.pipe(res);
    }



    @Get("/files")
    async getFiles() {
        const files = await this.courseService.getCourses();
        return { files };
    }

   


}
