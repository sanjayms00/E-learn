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
    data: any;
    options: any;
    totalStudents: number = 0
    totalCourses: number = 0


    constructor(
        private toastr: ToastrService,
        private dashboardService: DashboardService
    ) { }

    ngOnInit() {
        this.menuConfig()
        this.dashboardData()
    }

    //menu config data
    menuConfig() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    data: [50, 25, 12, 48, 56, 76, 42]
                },
                {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: documentStyle.getPropertyValue('--red-300'),
                    data: [21, 84, 24, 75, 37, 65, 34],
                    borderColor: 'white',
                    borderWidth: 2
                },
                {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: documentStyle.getPropertyValue('--pink-300'),
                    data: [41, 52, 24, 74, 23, 21, 32]
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };
    }

    //dahboard data on load
    dashboardData() {
        this.dashboardService.getDashboardData().subscribe(
            {
                next: (res) => {
                    this.countTotalStudents(res)
                    this.countTotalCourses(res)
                },
                error: (err) => {
                    this.toastr.error(err.message)
                }
            }
        )
    }

    //count total students
    countTotalStudents(response: instructorDashboardInterface) {
        this.totalCourses = response.courseStudentCount.reduce((acc, item) => {
            return acc + item.totalStudents
        }, 0)
    }

    //count total students
    countTotalCourses(response: instructorDashboardInterface) {
        this.totalStudents = response.courseStudentCount.length
    }



}
