import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { clientStateInterface } from 'src/app/shared/interface/client.interface';
import { clientLogin } from 'src/app/shared/store/actions/client.action';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
  studentLogin !: FormGroup

  constructor(
    private store: Store<{ client: clientStateInterface }>
  ) {
    this.studentLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/), Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  login() {
    console.log(this.studentLogin)
    if (this.studentLogin.valid) {
      const loginData = this.studentLogin.value

      this.store.dispatch(clientLogin({ loginData }))
    }
  }

}
