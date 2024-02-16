import { Controller, Get, UseGuards, Put, Body, Request, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { StudentProfileService } from '../services/student-profile.service';
import { studentJwtAuthGuard } from '../guards/student.guard';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('profile')
export class StudentProfileController {


    constructor(
        private profileService: StudentProfileService
    ) { }

    @UseGuards(studentJwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Put('update')
    async updateProfile(
        @Request() req,
        @UploadedFile() image
    ) {
        const studentId = req.user.id

        const profileData = req.body

        return await this.profileService.updateProfile(image, profileData, studentId)

    }


    @UseGuards(studentJwtAuthGuard)
    @Get('image')
    async profileImage(
        @Query('image') image: string,
    ) {
        const profileImage = await this.profileService.profileImage(image)
        return { profileImage }
    }



}
