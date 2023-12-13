import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { adminLocalAuthGuard } from 'src/admin/guards/adminLocalAuth.guard';
import { AdminAuthService } from 'src/admin/services/admin-auth/admin-auth.service';
// import { loginType } from 'src/types/type';

@Controller('admin/auth')
export class AdminAuthController {

    constructor(private adminAuthService: AdminAuthService){}

    @UseGuards(adminLocalAuthGuard)
    @Post('login')
    async adminLogin(@Request() req) {
        console.log("request", req.user)
        return this.adminAuthService.login(req.user);
      }

    @UseGuards(adminLocalAuthGuard)
    @Post('register')
    register(@Body() data){
        return data
    }

}
