import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnDestroy {
  showNavBar = true
  subscription !: Subscription
  constructor(private navbar: NavBarService) {
    this.subscription = this.navbar.showNavbar.subscribe((val) => {
      this.showNavBar = val
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }


}
