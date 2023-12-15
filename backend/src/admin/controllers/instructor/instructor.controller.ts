import { Controller, Get } from '@nestjs/common';
import { ClientService } from 'src/admin/services/client/client.service';

@Controller('admin/instructors')
export class InstructorController {

    constructor(
        private clientService: ClientService
    ) { }

    @Get()
    getInstructors() {
        return this.clientService.getAllINstructors()
    }

}

