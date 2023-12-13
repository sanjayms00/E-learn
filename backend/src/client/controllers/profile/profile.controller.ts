import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {

    @UseGuards(AuthGuard())
    @Get()
    getProfileData(){
        return {data : "sanjay"}
    }


}
