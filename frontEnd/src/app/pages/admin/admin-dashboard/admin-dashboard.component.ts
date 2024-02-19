import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminDashBoardService } from '../../../core/services/admin/admin-dash-board.service';
import { dashboardResponse } from '../../../shared/interface/admin.interface';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  dashboardData: dashboardResponse = {
    student: [],
    instructor: [],
    graph: []
  }
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

  ngOnDestroy(): void {
    this.dashboardDataSubscription.unsubscribe()
  }

}
