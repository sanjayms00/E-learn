import { AdminDashBoardService } from '../services/admin-dash-board.service';
export declare class AdminDashBoardController {
    private dashboardService;
    constructor(dashboardService: AdminDashBoardService);
    adminDashBoard(): Promise<{
        student: any[];
        instructor: any[];
        graph: any[];
    }>;
}
