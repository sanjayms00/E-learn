import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../../core/services/instructor/dashboard.service';
import { instructorDashboardInterface } from '../../../shared/interface/dashboard.interface';

@Component({
    selector: 'app-instructor-dashboard',
    templateUrl: './instructor-dashboard.component.html',
    providers: [DashboardService]
})
export class InstructorDashboardComponent {

    dashboard: instructorDashboardInterface = {
        counts: {
            courses: 0,
            sold: 0,
            rating: 0
        },
        graphData: undefined
    }

    constructor(
        private dashboardService: DashboardService,
        private destroyRef: DestroyRef
    ) { }

    ngOnInit() {
        this.dashboardService.getDashboardData()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(
                {
                    next: res => {
                        this.dashboard = res
                        this.dashboard.counts.rating = Number(res.counts.rating.toFixed(2))
                    },
                    error: (err) => {
                        console.log(err)
                    }
                }
            )
    }


}
