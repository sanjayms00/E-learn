import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  toastr = inject(ToastrService)
  authservice = inject(AuthService)
  email: string = ''
  loading: boolean = false;

  constructor(
    private destroyRef: DestroyRef
  ) { }

  forgotPassword() {

    const email = this.email.trim();

    if (!email) {
      this.toastr.error("Email is required")
      return
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    if (emailPattern.test(email)) {

      this.loading = true;

      this.authservice.forgotPassword(this.email)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            this.toastr.success(res.message)
            this.loading = false
          },
          error: err => {
            this.toastr.error(err)
          }
        })

    } else {
      this.toastr.error("Email is not valid")
    }
  }

}
