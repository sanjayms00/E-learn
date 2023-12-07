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
      exhaustMap((action) =>
        this.authService.adminLoginService(action).pipe(
          map(response => adminLoginSuccess({ token: '' })),
          catchError(error => of(adminLoginFailure({ error : error.message })))
        )
      )
    )
  );
}