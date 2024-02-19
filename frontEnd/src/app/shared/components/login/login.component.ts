import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm !: FormGroup

  @Input() title!: string
  @Input() description!: string
  @Output() formData = new EventEmitter()

  constructor(
    private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/),
        Validators.email
      ]),
      password: new FormControl(null, Validators.required),
    })
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value
      this.formData.emit(loginData)
    } else {
      this.toastr.error("Fill all fields")
    }
  }
}
