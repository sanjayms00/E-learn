import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { IUser } from '../../interface/common.interface';
import { appState } from '../../store/state/app.state';
import { Store } from '@ngrx/store';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm !: FormGroup


  @Input() title!: string
  @Input() description!: string
  @Output() formData = new EventEmitter()

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  login() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value
      this.formData.emit(loginData)
    }
  }
}
