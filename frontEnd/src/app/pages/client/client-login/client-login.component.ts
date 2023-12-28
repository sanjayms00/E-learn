import { SocialAuthService, GoogleLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { clientLogin } from 'src/app/shared/store/actions/client.action';
import { appState } from 'src/app/shared/store/state/app.state';



@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
  studentLogin !: FormGroup
  socialUser!: SocialUser;
  isLoggedin?: boolean;

  constructor(
    private store: Store<appState>,
    private socialAuthService: SocialAuthService
  ) {
    this.studentLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/), Validators.email]),
      password: new FormControl(null, [Validators.required])
    })

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });

  }


  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  logOut(): void {
    this.socialAuthService.signOut();
  }


  login() {
    if (this.studentLogin.valid) {
      const loginData = this.studentLogin.value

      this.store.dispatch(clientLogin({ loginData }))
    }
  }

}
