import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import { clientSignUp } from '../../../shared/store/actions/client.action';
import { appState } from '../../../shared/store/state/app.state';
import { SignUpInterface } from '../../../shared/interface/common.interface';

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html'
})
export class ClientSignupComponent {

  constructor(private store: Store<appState>) { }

  signUp(event: SignUpInterface) {
    this.store.dispatch(clientSignUp({ signUpdata: event }))
  }
}
