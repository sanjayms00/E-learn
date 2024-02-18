import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { clientSignUp } from 'src/app/shared/store/actions/client.action';
import { appState } from 'src/app/shared/store/state/app.state';
import { FormsService } from 'src/app/shared/services/forms.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html'
})
export class ClientSignupComponent {

  signUpForm!: FormGroup;
  otpStatus = false;

  constructor(
    private store: Store<appState>,
    private formsService: FormsService,
    private toastr: ToastrService
     ) {

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

  signUp() {
    if (this.signUpForm.valid) {
      const signUpdata = this.formsService.signUpService(this.signUpForm.value)
      this.store.dispatch(clientSignUp({ signUpdata }))
    }else{
      this.toastr.error("Fill all fields")
    }
  }

}
