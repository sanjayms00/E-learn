
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { clientLogin } from 'src/app/shared/store/actions/client.action';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html'
})
export class ClientLoginComponent {
  studentLogin !: FormGroup
  isLoggedin?: boolean;

  constructor(
    private store: Store<appState>,
  ) {
    this.studentLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/), Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  login() {
    if (this.studentLogin.valid) {
      const loginData = this.studentLogin.value
      //dispatch login action
      this.store.dispatch(clientLogin({ loginData }))
    }
  }

}
