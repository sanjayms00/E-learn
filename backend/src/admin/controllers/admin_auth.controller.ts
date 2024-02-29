import { Body, Controller, Post } from '@nestjs/common';
import { AdminDto } from 'src/admin/dtos/adminDto';

import { AdminAuthService } from 'src/admin/services/admin-auth.service';
import { LoginDto } from 'src/common/dtos/loginDto';

@Controller('auth')
export class AdminAuthController {

    constructor(private adminAuthService: AdminAuthService) { }

    @Post('login')
    async adminLogin(@Body() adminLoginData: LoginDto) {
        return this.adminAuthService.login(adminLoginData);
    }

    @Post('register')
    async register(@Body() data: AdminDto) {
        return await this.adminAuthService.registerAdmin(data)
    }

}
