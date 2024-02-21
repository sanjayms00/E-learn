import { InstructorDashboardService } from '../services/instructor-dashboard.service';
export declare class InstructorDashboardController {
    private dashboardService;
    constructor(dashboardService: InstructorDashboardService);
    profieData(req: any): Promise<{
        counts: {
            courses: any;
            sold: any;
            rating: any;
        };
        graphData: any[];
    }>;
}
