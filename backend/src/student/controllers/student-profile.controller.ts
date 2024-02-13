import { Controller, Get, UseGuards, Put, Body, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudentProfileService } from '../services/student-profile.service';
import { studentJwtAuthGuard } from '../guards/student.guard';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('profile')
export class StudentProfileController {


    constructor(
        private profileService: StudentProfileService
    ) { }

    @UseGuards(studentJwtAuthGuard)
    @Get()
    async getProfile(
        @Request() req,
    ) {
        const studentId = req.user.id
        return await this.profileService.getProfile(studentId)
    }


    @UseGuards(studentJwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Put('update')
    async updateProfile(
        @Body() profileData,
        @Request() req,
        @UploadedFile() image
    ) {
        const studentId = req.user.id

        return await this.profileService.updateProfile(image, profileData, studentId)

    }

}
