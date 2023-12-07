import { Body, Controller, Get, Post } from '@nestjs/common';
import { adminRegisterData } from 'src/interfaces/admin.interface';
import { loginDataInterface } from 'src/interfaces/common.interface';
import { AdminService } from './admin.service';


@Controller('admin')
export class AdminController {

    constructor(
        private adminService: AdminService
    ){}


    @Post('login')
    adminLogin(@Body() loginData: loginDataInterface){
        console.log(loginData)
        return this.adminService.login(loginData)
    }

    @Post('register')
    adminRegister(@Body() admindata : adminRegisterData){
        console.log(admindata)
        return this.adminService.register(admindata)
    }

    @Get('student-list')
    getStudentList(){
        return 
    }

}
