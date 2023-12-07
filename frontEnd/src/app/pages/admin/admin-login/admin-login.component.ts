import { Component } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { adminLogin } from 'src/app/shared/store/actions/admin.action';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private store: Store
    ){}

  adminLoginForm = this.fb.nonNullable.group({
    email : ['admin@gmail.com', Validators.required],
    password: ['123456', Validators.required]
  })

  adminLoginSubmit(){
    const formData = this.adminLoginForm.getRawValue();
    this.store.dispatch(adminLogin(formData))
    // this.authService.adminLogin(formData).subscribe((res)=>{
    //   console.log(res)
    // })
  }
  

}
