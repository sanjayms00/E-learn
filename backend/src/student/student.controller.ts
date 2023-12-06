import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from 'src/schemas/student.schema';

@Controller('student')
export class StudentController {
    
    constructor(private readonly studentService: StudentService){}

    @Get('')
    async getAllStudents(): Promise<Student[]>
    {
        return this.studentService.findAll()
    }

    @Post('/register')
    registerStudent(@Body() student: Student): Promise<Student>
    {
        return this.studentService.createStudent(student)
    }

    @Get(':id')
    getStudent(@Param('id') id: string): Promise<Student>
    {   
        return this.studentService.findById(id)
    }

    @Put(':id')
    updateStudent(
        @Param('id') id: string, 
        @Body() student: Student
    ): Promise<Student>
    {   
        return this.studentService.updateById(id, student)
    }

}
