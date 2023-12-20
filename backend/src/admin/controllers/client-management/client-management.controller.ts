import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { statusDto } from 'src/admin/dtos/status.dto';
import { AdminJwtAuthGuard } from 'src/admin/guards/adminJwtAuth.guard';
import { ClientService } from 'src/admin/services/client/client.service';

@Controller('api/admin/clients')
export class ClientManagementController {

    constructor(
        private clientService: ClientService
    ) { }

    @UseGuards(AdminJwtAuthGuard)
    @Get()
    getClients() {
        return this.clientService.getAllClients()
    }

    @UseGuards(AdminJwtAuthGuard)
    @Patch('status')
    changeStudentStatus(@Body() data: statusDto) {
        return this.clientService.changeStatus(data)
    }






}
