import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';

import { SignupDto } from './dto/signup.dto';

@Controller('student')
export class StudentController {
    
    constructor(private readonly studentService: StudentService){}

    //signup api endpoint
    @Post('signUp')
    studentSignUp(@Body() studentData : SignupDto): Promise<{token : string}>
    {
        return this.studentService.signUp(studentData)
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
