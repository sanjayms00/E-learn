import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { loginDataInterface } from 'src/interfaces/common.interface';
import { AdminService } from './admin.service';
import { StudentService } from 'src/student/student.service';
import { Student } from 'src/student/schemas/student.schema';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminDto } from 'src/student/dto/admin.dto';


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
    adminRegister(@Body() admindata : AdminDto): Promise<{access_token : string}>
    {
        return this.adminService.register(admindata)
    }

    @UseGuards(AuthGuard)
    @Get('students')
    getStudentList(): Promise<Student[]>
    {
        return this.studentService.getStudents()
    }

    @UseGuards(AuthGuard)
    @Get('instructors')
    getInstructorsList(): Promise<Student[]>
    {
        return this.studentService.getInstructors()
    }

}
