import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { statusDto } from 'src/admin/dtos/status.dto';
import { AdminJwtAuthGuard } from 'src/admin/guards/adminJwtAuth.guard';
import { ClientService } from 'src/admin/services/client/client.service';

@Controller('api/admin/client')
export class ClientManagementController {

    constructor(
        private clientService: ClientService
    ) { }

    @UseGuards(AdminJwtAuthGuard)
    @Get('/students')
    getStudents() {
        return this.clientService.getAllStudents()
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get('/instructors')
    getInstructors() {
        return this.clientService.getAllInstructors()
    }

    @UseGuards(AdminJwtAuthGuard)
    @Patch('status')
    changeStudentStatus(@Body() data: statusDto) {
        return this.clientService.changeStatus(data)
    }






}
