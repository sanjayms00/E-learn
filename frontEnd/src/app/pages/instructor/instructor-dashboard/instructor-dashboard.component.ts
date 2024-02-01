import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/core/services/instructor/dashboard.service';
import { instructorDashboardInterface } from 'src/app/shared/interface/dashboard.interface';

@Component({
    selector: 'app-instructor-dashboard',
    templateUrl: './instructor-dashboard.component.html',
    providers: [DashboardService]
})
export class InstructorDashboardComponent {
    totalStudents: number = 0
    totalCourses: number = 0


    constructor(
        private toastr: ToastrService,
        private dashboardService: DashboardService
    ) { }

    ngOnInit() {
        this.dashboardData()
    }


    //dahboard data on load
    dashboardData() {
        this.dashboardService.getDashboardData().subscribe(
            {
                next: (res) => {
                    this.totalCourses = res.courseStudentCount[0].totalCourses
                    this.totalStudents = res.courseStudentCount[0].totalStudents
                },
                error: (err) => {
                    this.toastr.error(err.message)
                }
            }
        )
    }



}
