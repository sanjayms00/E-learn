import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrls: ['./instructor-login.component.css']
})
export class InstructorLoginComponent {

  instructorLogin !: FormGroup

  constructor(){
    this.instructorLogin =  new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    })
  }

  Instrucorlogin(){}
 

}
