import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { InstructorJwtAuthGuard } from '../guard/instructor.guard';
import { InstructorDashboardService } from '../services/instructor-dashboard.service';

@Controller('dashboard')
export class InstructorDashboardController {


    constructor(
        private dashboardService: InstructorDashboardService
    ) { }

    @UseGuards(InstructorJwtAuthGuard)
    @Get('')
    async profieData(@Request() req) {
        const instructorId = req.user.id
        const dashData = await this.dashboardService.dashboardData(instructorId)
        return dashData
    }



}
