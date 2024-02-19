import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { appState } from 'src/app/shared/store/state/app.state';
import { instructorSignUp } from 'src/app/shared/store/actions/instructor.action';
import { FormsService } from 'src/app/shared/services/forms.service';
import { SignUpInterface } from 'src/app/shared/interface/common.interface';


@Component({
  selector: 'app-instructor-signup',
  templateUrl: './instructor-signup.component.html'
})
export class InstructorSignupComponent {

  constructor(
    private store: Store<appState>
  ) { }

  register(event: SignUpInterface) {
    this.store.dispatch(instructorSignUp({ signUpdata: event }))
  }


}
