import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
  
  studentLogin !:FormGroup

    constructor(private authService: AuthService ){}


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
