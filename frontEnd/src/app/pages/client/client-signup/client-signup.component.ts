import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { clientInterface } from 'src/app/shared/interface/client.interface';
import { clientSignUp } from 'src/app/shared/store/actions/client.action';
import { SignUpInterface } from 'src/app/shared/interface/common.interface';
// import { confirmPasswordValidator } from 'src/app/shared/validators/validator';

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent implements OnInit {

  signUpForm!: FormGroup

  constructor(
    private store: Store<{ client: clientInterface }>
  ) {
    this.signUpForm = new FormGroup({
      fName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.minLength(3), Validators.maxLength(20)]),
      lName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/), Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
    }, { validators: this.confirmPasswordValidator });
  }

  ngOnInit(): void {

  }

  confirmPasswordValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true }
  }


  signUp() {
    if (this.signUpForm.valid) {
      console.log("in")
      const signUpdata: SignUpInterface = this.signUpForm.value;
      this.store.dispatch(clientSignUp({ signUpdata }))
    }
  }


}
