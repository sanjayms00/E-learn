import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { FormsService } from '../../services/forms.service';
import { appState } from '../../store/state/app.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  signUpForm!: FormGroup
  @Output() formData = new EventEmitter()

  constructor(
    private store: Store<appState>,
    private formsService: FormsService,
    private toastr: ToastrService) {

    this.signUpForm = new FormGroup({
      fullName: new FormControl(null, [
        Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(5)
      ]),
      email: new FormControl(null, [
        Validators.required, Validators.pattern(/^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/), Validators.email
      ]),
      mobile: new FormControl(null, [
        Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)
      ])
    }, { validators: this.confirmPasswordValidator });
  }

  confirmPasswordValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true }
  }


  register() {
    if (this.signUpForm.valid) {
      const registerData = this.formsService.signUpService(this.signUpForm.value)
      this.formData.emit(registerData)
    } else {
      this.toastr.error("Fill all fields")
    }
  }
}
