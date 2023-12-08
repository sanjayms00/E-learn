import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/core/services/auth.service";

import { exhaustMap, map, catchError, of } from 'rxjs'
import { clientLogin, clientLoginFailure, clientLoginSuccess, clientSignUp, clientSignUpFailure, clientSignUpSuccess } from "../actions/client.action";
import { Router } from "@angular/router";


@Injectable()
export class clientEffects {

    constructor(
        private action$ : Actions,
        private authService : AuthService,
        private router: Router
    ){}
    
    _clientLogin$ = createEffect(() =>
      this.action$.pipe(
        ofType(clientLogin),
        exhaustMap((action) =>{
          const data = action.loginData
          return this.authService.studentLogin(data).pipe(
            map((response: any) => {
              alert("success")
              localStorage.setItem('clientToken', JSON.stringify(response.token));
              this.router.navigateByUrl('/home')
              return clientLoginSuccess({token : response.token})
            }),
            catchError(error => {
              console.log(error.error.message)
              return of(clientLoginFailure())
          }))
        })
      )
    );
    

    _clientSignUp$ = createEffect(() =>
      this.action$.pipe(
        ofType(clientSignUp),
        exhaustMap((action) =>{
          const data = action.signUpdata
          return this.authService.studentSignUp(data).pipe(
            map((response: any) => {
              alert("success")
              localStorage.setItem('clientToken', JSON.stringify(response.token));
              this.router.navigateByUrl('/home')
              return clientSignUpSuccess({token : response.token})
            }),
            catchError(error => {
              console.log(error.error.message)
              return of(clientSignUpFailure())
            })
          )
        })
      )
    );




}