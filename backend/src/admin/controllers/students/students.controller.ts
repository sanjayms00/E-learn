import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { adminJwtAuthGuard } from 'src/admin/guards/adminJwtAuth.guard';

@Controller('admin/students')
export class StudentsController {

    @UseGuards(adminJwtAuthGuard)
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

    @UseGuards(adminJwtAuthGuard)
    @Patch('status')
    changeStudentStatus(@Body() data: {id : number}){
        const { id } = data
        if(id === 1) return 'status changed'
    }


}
