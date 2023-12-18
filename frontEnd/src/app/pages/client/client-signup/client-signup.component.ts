import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { clientSignUp } from 'src/app/shared/store/actions/client.action';
import { SignUpInterface } from 'src/app/shared/interface/common.interface';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent {

  signUpForm!: FormGroup

  constructor(
    private store: Store<appState>
  ) {
    this.signUpForm = new FormGroup({
      fName: new FormControl(null, [
        Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3), Validators.maxLength(20)
      ]),
      lName: new FormControl(null, [
        Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(20)
      ]),
      email: new FormControl(null, [
        Validators.required, Validators.pattern(/^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/), Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required, Validators.minLength(6), Validators.maxLength(15), Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)
      ]),
    }, { validators: this.confirmPasswordValidator });
  }

  confirmPasswordValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true }
  }

  signUp() {
    if (this.signUpForm.valid) {
      const signUpdata: SignUpInterface = this.signUpForm.value;
      this.store.dispatch(clientSignUp({ signUpdata }))
    }
  }


}
