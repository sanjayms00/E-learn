import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html'
})
export class AdminSidebarComponent implements OnDestroy {
  showNavBar = true
  subscription !: Subscription
  constructor(
    private navbar: NavBarService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
    ) {
    this.subscription = this.navbar.showNavbar.subscribe((val) => {
      this.showNavBar = val
    })
  }


  adminLogout() {
    this.authService.adminLogout()
    this.toastr.success("Logout successful")
    this.router.navigateByUrl("/admin/login")
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


}
