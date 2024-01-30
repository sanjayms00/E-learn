import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {

  resetForm!: FormGroup
  token!: string | null

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.token = this.route.snapshot.paramMap.get('token')
    if (this.token) {
      this.resetForm = this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      })
    } else {
      this.router.navigateByUrl("/forgot-password")
    }

  }

  //from submit
  resetPasswordSubmit() {
    if (this.resetForm.valid && this.token) {
      const password = this.resetForm.value.password
      const confPassword = this.resetForm.value.confirmPassword
      //check passwords
      if (password === confPassword) {
        this.authService.resetPassword(this.token, password).subscribe(
          res => {
            this.toastr.success(res.message)
            this.router.navigate(['/login'])
          },
          error => {
            this.toastr.error(error);
          },
        )
      } else {
        this.toastr.error("password does not match")
      }
    } else {
      this.toastr.error("fill all the fields")
    }
  }

}
