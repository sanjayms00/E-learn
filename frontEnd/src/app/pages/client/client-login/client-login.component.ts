
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from '../../../shared/interface/common.interface';
import { clientLogin } from '../../../shared/store/actions/client.action';
import { appState } from '../../../shared/store/state/app.state';

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
