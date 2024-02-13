import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminDashBoardService } from 'src/app/core/services/admin/admin-dash-board.service';
import { dashboardResponse } from 'src/app/shared/interface/admin.interface';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  dashboardData!: dashboardResponse
  dashboardDataSubscription!: Subscription

  constructor(
    private adminDashboardService: AdminDashBoardService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dashboardDataSubscription = this.adminDashboardService.DashboardData()
    .subscribe({
      next: res => {
        this.dashboardData = res
      },
      error: err => {
        this.toastr.error(err.message)
      }
    })
  }

}
