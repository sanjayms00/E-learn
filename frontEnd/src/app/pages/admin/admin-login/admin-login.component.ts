import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { adminLogin } from 'src/app/shared/store/actions/admin.action';
import { NavBarService } from 'src/app/shared/services/nav-bar.service';
import { SignUpInterface, loginInterface } from 'src/app/shared/interface/common.interface';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  adminLoginForm !: FormGroup

  constructor(
    private authService: AuthService,
    private store: Store,
    private navService: NavBarService
  ) {
    this.adminLoginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/),
        Validators.email

      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)
      ])
    })
  }

  //hide nav bar
  ngOnInit(): void {
    this.navService.hide()
  }

  //admin login submit
  adminLoginSubmit(): void {
    if (this.adminLoginForm.valid) {
      const admindata = this.adminLoginForm.value
      this.store.dispatch(adminLogin({ logindata: admindata }))
    }
  }

  //to show nav bar
  ngOnDestroy(): void {
    this.navService.display()
  }

}
