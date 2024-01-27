import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { InstructorProfileService } from '../services/instructor-profile.service';
import { InstructorJwtAuthGuard } from '../guard/instructor.guard';

@Controller('instructor/profile')
export class InstructorProfileController {


    constructor(
        private profileService: InstructorProfileService
    ){}

    @UseGuards(InstructorJwtAuthGuard)
    @Get()
    async profieData(@Request() req){
        const instructorId = req.user.id
        return await this.profileService.profileData(instructorId)
    }
    


}
