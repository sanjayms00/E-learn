import { Body, Controller, Post } from '@nestjs/common';
import { AdmminDto } from 'src/admin/dtos/adminDto';

import { AdminAuthService } from 'src/admin/services/admin-auth/admin-auth.service';
import { LoginDto } from 'src/client/dtos/loginDto';

@Controller('admin/auth')
export class AdminAuthController {

    constructor(private adminAuthService: AdminAuthService) { }


    @Post('login')
    async adminLogin(@Body() adminLoginData: LoginDto) {
        return this.adminAuthService.login(adminLoginData);
    }

    @Post('register')
    register(@Body() data: AdmminDto) {
        console.log(data)
        return this.adminAuthService.registerAdmin(data)
    }

}
