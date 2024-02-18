import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { adminLogin } from 'src/app/shared/store/actions/admin.action';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';
import { appState } from 'src/app/shared/store/state/app.state';
import { IUser } from 'src/app/shared/interface/common.interface';

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
  ) {}

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
