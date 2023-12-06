import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.css']
})
export class ClientSignupComponent implements OnInit {

  signUpForm !: FormGroup

  constructor(private authservice: AuthService){}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      fName : new FormControl('sanjay'),
      lName : new FormControl('m s'),
      email : new FormControl('sanjay@gmail.com'),
      password : new FormControl('123456'),
      confirmPassword : new FormControl('123456')
    })
  }

  signUp(){
    const formData = this.signUpForm.value;
    this.authservice.registerStudent(formData).subscribe( res => console.log("returned",res))
  }


}
