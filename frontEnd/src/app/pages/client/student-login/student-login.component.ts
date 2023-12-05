import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ClientAuthService } from 'src/app/core/services/client-auth.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css'],
  providers: [ClientAuthService]
})
export class StudentLoginComponent implements OnInit {

  studentLogin !:FormGroup

    constructor(private authService: ClientAuthService ){}


  ngOnInit(): void {
    this.studentLogin = new FormGroup({
      email : new FormControl('sanjay@gmail.com'),
      password : new FormControl('123456')
    })
  }
  
  login(){
    const loginData = this.studentLogin.value
    this.authService.studentLogin(loginData).subscribe(res =>{
      console.log("returned", res)
    })
  }




}
