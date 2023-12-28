import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { instructorLogin } from 'src/app/shared/store/actions/instructor.action';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrls: ['./instructor-login.component.css']
})
export class InstructorLoginComponent {

  instructorLogin !: FormGroup

  constructor(
    private store: Store<appState>
  ){
    this.instructorLogin =  new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  Instrucorlogin(){
    if (this.instructorLogin.valid) {
      const loginData = this.instructorLogin.value
      this.store.dispatch(instructorLogin({ loginData }))
    }
  }
 

}
