import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/profile')
export class ProfileController {

    @UseGuards(AuthGuard())
    @Get()
    getProfileData(){
        return {data : "sanjay"}
    }
}
