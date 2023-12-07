import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/core/services/auth.service";

import { exhaustMap, map, catchError, of } from 'rxjs'
import { clientLogin } from "../actions/client.action";


@Injectable()
export class clientEffects {

    constructor(
        private action$ : Actions,
        private authService : AuthService 
    ){}
    
    _clientLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientLogin),
      exhaustMap((action) =>
        this.authService.adminLoginService(action.loginData).pipe(
          map(response => {
                console.log(response)
                return ({ token: '' })
            }),
          catchError(error => {
            console.log("error", error.messsage)
            return of(error.message)
        })
        )
      )
    )
  );
}