import { Component } from '@angular/core';
import { FormBuilder , Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private fb: FormBuilder, private authService: AuthService){}

  adminLoginForm = this.fb.nonNullable.group({
    email : ['', Validators.required],
    password: ['', Validators.required]
  })

  adminLoginSubmit(){
    const formData = this.adminLoginForm.getRawValue();
    console.log(formData)
    this.authService.adminLogin(formData).subscribe((res)=>{
      console.log(res)
    })
  }
  

}
