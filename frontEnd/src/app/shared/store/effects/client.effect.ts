import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/core/services/auth.service";

import { exhaustMap, map, catchError, of } from 'rxjs'
import { clientLogin, clientLoginSuccess } from "../actions/client.action";


@Injectable()
export class clientEffects {

    constructor(
        private action$ : Actions,
        private authService : AuthService 
    ){}
    
    _clientLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientLogin),
      exhaustMap((action) =>{
        const data = action.loginData
        return this.authService.studentLogin(data).pipe(
          map((response: any) => {
                localStorage.setItem('userToken', JSON.stringify(response.token));
                return clientLoginSuccess({token : response.token})
            }),
          catchError(error => {
            console.log("login response error", error.messsage)
            return of(error.message)
        }))
      })
    )
  );
}