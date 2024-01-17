import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/shared/store/state/app.state';
import { instructorSignUp } from 'src/app/shared/store/actions/instructor.action';
import { FormsService } from 'src/app/shared/services/forms.service';


@Component({
  selector: 'app-instructor-signup',
  templateUrl: './instructor-signup.component.html'
})
export class InstructorSignupComponent {

  instructorSignUp !: FormGroup;

  constructor(
    private store: Store<appState>,
    private formsService: FormsService
  ){
    this.instructorSignUp = new FormGroup({
      fullName: new FormControl(null, [
        Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(50)
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
      ]),
    }, { validators: this.confirmPasswordValidator });
  }

  confirmPasswordValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ? null : { mismatch: true }
  }

  instructorSignUpSubmit(){
    if (this.instructorSignUp.valid) {
      const signUpdata = this.formsService.signUpService(this.instructorSignUp.value)
      this.store.dispatch(instructorSignUp({  signUpdata }))
    }
  
  }


}
