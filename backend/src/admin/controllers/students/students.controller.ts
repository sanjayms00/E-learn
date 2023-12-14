import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin/students')
export class StudentsController {

    @UseGuards(AuthGuard())
    @Get()
    getAllStudents(){
        return [
            {
                name: "sanjay",
                email: "sanjay@gmail.com"
            },
            {
                name: "ajay",
                email: "ajay@gmail.com"
            },  
        ]
    }

    @UseGuards(AuthGuard())
    @Patch('status')
    changeStudentStatus(@Body() data: {id : number}){
        const { id } = data
        if(id === 1) return 'status changed'
    }


}
