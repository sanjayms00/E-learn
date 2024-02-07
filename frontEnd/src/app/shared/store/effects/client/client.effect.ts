import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/core/services/auth.service";

import { exhaustMap, map, catchError, of } from 'rxjs'
import { OtpVerify, clientLogin, clientLoginFailure, clientLoginSuccess, clientSignUp, clientSignUpFailure, clientSignUpFirstStep, clientSignUpSuccess } from "../../actions/client.action"
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class clientEffects {

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  _clientLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientLogin),
      exhaustMap((action) => {
        const data = action.loginData
        return this.authService.studentLogin(data).pipe(
          map((response: any) => {
            this.toastr.success("Login successfull")
            localStorage.setItem('clientToken', response.access_token);
            localStorage.setItem('clientData', JSON.stringify(response.user));
            this.router.navigateByUrl('/home')
            return clientLoginSuccess({ user: response.user })
          }),
          catchError(error => {
            console.log(`${error.error?.error} ${error.error?.message}`)
            return of(clientLoginFailure())
          }))
      })
    )
  );


  _clientSignUpFirstStep$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientSignUp),
      exhaustMap((action) => {
        const data = action.signUpdata
        return this.authService.studentSignUp(data).pipe(
          map((response: { email: string }) => {
            this.toastr.success("OTP send")
            localStorage.setItem('clientMail', response.email);
            this.router.navigateByUrl('/otp')
            return clientSignUpFirstStep()
          }),
          catchError(error => {
            console.log(error.error?.message)
            return of(clientSignUpFailure())
          })
        )
      })
    )
  );

  _clientOtpVerify$ = createEffect(() =>
    this.action$.pipe(
      ofType(OtpVerify),
      exhaustMap((action) => {
        return this.authService.verifyotp(action).pipe(
          map((response) => {
            console.log(response)
            localStorage.setItem('clientToken', response.access_token);
            localStorage.setItem('clientData', JSON.stringify(response.user));
            this.router.navigateByUrl('/home')
            this.toastr.success("signup")
            localStorage.removeItem("clientMail")
            return clientSignUpSuccess({ user: response.user })

          }),
          catchError(error => {
            console.log(error.error?.message)
            return of(clientSignUpFailure())
          })
        )
      })
    )
  );




}