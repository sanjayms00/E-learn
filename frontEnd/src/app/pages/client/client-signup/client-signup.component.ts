import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from "@ngrx/store";
import { clientSignUp } from 'src/app/shared/store/actions/client.action';
import { appState } from 'src/app/shared/store/state/app.state';
import { FormsService } from 'src/app/shared/services/forms.service';
import { ToastrService } from 'ngx-toastr';
import { SignUpInterface } from 'src/app/shared/interface/common.interface';

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
