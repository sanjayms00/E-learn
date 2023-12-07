import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

// import { clientLogin } from 'src/app/shared/store/actions/client.action';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
  
  studentLogin !:FormGroup

    constructor(
      private store: Store 
    ){}


  ngOnInit(): void {
    this.studentLogin = new FormGroup({
      email : new FormControl('sanjay@gmail.com'),
      password : new FormControl('123456')
    })
  }
  
  login(){
    const loginData = this.studentLogin.value
    // this.store.dispatch(clientLogin({loginData}))
  }
}
