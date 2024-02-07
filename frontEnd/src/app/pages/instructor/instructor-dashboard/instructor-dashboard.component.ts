import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/core/services/instructor/dashboard.service';
import { instructorDashboardInterface } from 'src/app/shared/interface/dashboard.interface';

@Component({
    selector: 'app-instructor-dashboard',
    templateUrl: './instructor-dashboard.component.html',
    providers: [DashboardService]
})
export class InstructorDashboardComponent {

    dashboard!: instructorDashboardInterface


    constructor(
        private toastr: ToastrService,
        private dashboardService: DashboardService,
        private destroyRef: DestroyRef
    ) { }

    ngOnInit() {
        this.dashboardData()
    }


    //dahboard data on load
    dashboardData() {
        this.dashboardService.getDashboardData()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                {
                    next: (res) => {
                        this.dashboard = res
                    },
                    error: (err) => {
                        this.toastr.error(err.message)
                    }
                }
            )
    }



}
