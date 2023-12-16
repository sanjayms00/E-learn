import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { statusDto } from 'src/admin/dtos/status.dto';
import { AdminJwtAuthGuard } from 'src/admin/guards/adminJwtAuth.guard';
import { ClientService } from 'src/admin/services/client/client.service';

@Controller('admin/students')
export class StudentsController {

    constructor(
        private clientService: ClientService
    ) { }

    @UseGuards(AdminJwtAuthGuard)
    @Get()
    getAllStudents() {
        return this.clientService.getAllStudents()
    }

    @UseGuards(AdminJwtAuthGuard)
    @Patch('status')
    changeStudentStatus(@Body() data: statusDto) {
        return this.clientService.changeStatus(data)
    }


}
