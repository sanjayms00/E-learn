import { Injectable, effect } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/core/services/auth.service";
import { adminLogin, adminLoginFailure, adminLoginSuccess } from "../actions/admin.action";
import { exhaustMap, map, catchError, of } from 'rxjs'

@Injectable()
export class adminEffects {

    constructor(
        private action$ : Actions,
        private authService : AuthService 
    ){}
    

    _adminLogin$ = createEffect(() =>
      this.action$.pipe(
        ofType(adminLogin),
        exhaustMap((action) =>{
          const data = action.logindata
          return this.authService.adminLogin(data).pipe(
            map((response: any) => {
                  localStorage.setItem('adminToken', JSON.stringify(response.token));
                  return adminLoginSuccess({token : response.token})
              }),
            catchError(error => {
              console.log("login response error", error.messsage)
              return of(error.message)
          }))
        })
      )
    );
}