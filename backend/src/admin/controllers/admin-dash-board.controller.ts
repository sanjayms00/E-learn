import { Controller, Get } from '@nestjs/common';
import { AdminDashBoardService } from '../services/admin-dash-board.service';

@Controller('dashboard')
export class AdminDashBoardController {

    constructor(
        private dashboardService: AdminDashBoardService
    ){}

    @Get()
    async adminDashBoard(){
        return await this.dashboardService.adminDashBoard()
    }



}
