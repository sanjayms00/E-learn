import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { adminLogin } from '../../../shared/store/actions/admin.action';
import { NavBarService } from '../../../shared/services/nav-bar.service';
import { appState } from '../../../shared/store/state/app.state';
import { IUser } from '../../../shared/interface/common.interface';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  title = "Admin";
  description = "Unlocking Knowledge, One Login at a Time."

  constructor(
    private authService: AuthService,
    private store: Store<appState>,
    private navService: NavBarService
  ) { }

  //hide nav bar
  ngOnInit(): void {
    this.navService.hide()
  }

  //admin login submit

  loginData(event: IUser) {
    this.store.dispatch(adminLogin({ loginData: event }))
  }


  //to show nav bar
  ngOnDestroy(): void {
    this.navService.display()
  }

}
