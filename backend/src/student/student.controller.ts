import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';

import { SignupDto } from './dto/signup.dto';
import { loginDataInterface } from 'src/interfaces/common.interface';

@Controller('api/student')
export class StudentController {
    
    constructor(private readonly studentService: StudentService){}

    //signup api endpoint
    @Post('signUp')
    studentSignUp(@Body() studentData : SignupDto): Promise<{access_token : string}>
    {
        return this.studentService.signUp(studentData)
    }

    @Post('login')
    studentLogin(@Body() studentData : loginDataInterface): Promise<{access_token : string}>
    {   console.log("sudent data", studentData)
        return this.studentService.login(studentData)
    }

    // @Get('')
    // async getAllStudents(): Promise<Student[]>
    // {
    //     return this.studentService.findAll()
    // }

    // @Post('/register')
    // registerStudent(@Body() student: Student): Promise<Student>
    // {
    //     return this.studentService.createStudent(student)
    // }

    // @Get(':id')
    // getStudent(@Param('id') id: string): Promise<Student>
    // {   
    //     return this.studentService.findById(id)
    // }

    // @Put(':id')
    // updateStudent(
    //     @Param('id') id: string, 
    //     @Body() student: Student
    // ): Promise<Student>
    // {   
    //     return this.studentService.updateById(id, student)
    // }

}
