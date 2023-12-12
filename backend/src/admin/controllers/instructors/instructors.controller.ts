import { Body, Controller, Get, Patch } from '@nestjs/common';

@Controller('admin/instructors')
export class InstructorsController {
    
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

    @Patch('status')
    changeStudentStatus(@Body() data: {id : number}){
        const { id } = data
        if(id === 1) return 'status changed'
    }



}
