import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {

  toastr = inject(ToastrService)
  authservice = inject(AuthService)
  email: string = ''

  constructor(
    private destroyRef: DestroyRef
  ) { }

  forgotPassword() {
    if (this.email.trim()) {
      this.authservice.forgotPassword(this.email)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: res => {
            this.toastr.success("Reset password mail send")
          },
          error: err => {
            this.toastr.error(err.message)
          }
        })

    } else {
      this.toastr.error("Email required")
    }
  }
}
