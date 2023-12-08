import { Body, Controller, Get, Post } from '@nestjs/common';
import { adminRegisterData } from 'src/interfaces/admin.interface';
import { loginDataInterface } from 'src/interfaces/common.interface';
import { AdminService } from './admin.service';
import { StudentService } from 'src/student/student.service';
import { Student } from 'src/student/schemas/student.schema';


@Controller('api/admin')
export class AdminController {

    constructor(
        private adminService: AdminService,
        private studentService: StudentService
    ){}

    @Get()
    getAdmin(): string {
        return 'Hello from the admin API!';
    }

    @Post('login')
    adminLogin(@Body() loginData: loginDataInterface){
        return this.adminService.login(loginData)
    }

    @Post('register') 
    adminRegister(@Body() admindata : adminRegisterData){
        console.log(admindata)
        return this.adminService.register(admindata)
    }

    @Get('students')
    getStudentList(): Promise<Student[]>
    {
        return this.studentService.getStudents()
    }
    @Get('instructors')
    getInstructorsList(): Promise<Student[]>
    {
        return this.studentService.getIntructors()
    }

}
