import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { statusDto } from 'src/admin/dtos/status.dto';
import { AdminJwtAuthGuard } from 'src/admin/guards/adminJwtAuth.guard';
import { ClientService } from 'src/admin/services/client.service';

@Controller('')
export class ClientManagementController {

    constructor(
        private clientService: ClientService
    ) { }

    @UseGuards(AdminJwtAuthGuard)
    @Get('students')
    async getStudents() {
        return await this.clientService.getAllStudents()
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get('instructors')
    async getInstructors() {
        return await this.clientService.getAllInstructors()
    }

    @UseGuards(AdminJwtAuthGuard)
    @Patch('student-status')
    async changeStudentStatus(@Body() data: statusDto) {
        return await this.clientService.changeStudentStatus(data)
    }

    @UseGuards(AdminJwtAuthGuard)
    @Patch('instructor-status')
    async changeInstructorStatus(@Body() data: statusDto) {
        return await this.clientService.changeInstructorStatus(data)
    }






}
