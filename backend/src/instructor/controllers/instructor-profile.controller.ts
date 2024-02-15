import { Controller, Get, Request, Put, UseGuards, Body, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { InstructorProfileService } from '../services/instructor-profile.service';
import { InstructorJwtAuthGuard } from '../guard/instructor.guard';
import { InstructorProfileDto } from '../dtos/instructorProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class InstructorProfileController {


    constructor(
        private profileService: InstructorProfileService
    ) { }

    @UseGuards(InstructorJwtAuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Put('update')
    async profieData(
        @Request() req,
        @UploadedFile() image,
    ) {
        const formData = req.body;

        const instructorId = req.user.id

        console.log(instructorId, formData, image)

        const updatedProfileData = await this.profileService.profileUpdate(instructorId, formData, image)

        return updatedProfileData

    }


    @UseGuards(InstructorJwtAuthGuard)
    @Get('image')
    async profileImage(
        @Query('image') image: string,
    ) {
        const profileImage = await this.profileService.profileImage(image)
        return { profileImage }
    }



}
