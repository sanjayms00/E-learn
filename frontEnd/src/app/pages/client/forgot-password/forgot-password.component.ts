import { Component, inject } from '@angular/core';
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

  forgotPassword() {
    if (this.email.trim()) {
      this.authservice.forgotPassword(this.email).subscribe(res => {
        console.log(res)
        this.toastr.success("Reset password mail send")
      })
      
    } else {
      this.toastr.error("email required")
    }
  }



}
