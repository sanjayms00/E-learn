
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IUser } from 'src/app/shared/interface/common.interface';
import { clientLogin } from 'src/app/shared/store/actions/client.action';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html'
})
export class ClientLoginComponent {

  title = "Student";
  description = "Unlocking Knowledge, One Login at a Time."

  constructor(
    private store: Store<appState>,
  ) { }

  loginData(event: IUser) {
    this.store.dispatch(clientLogin({ loginData: event }))
  }

}
