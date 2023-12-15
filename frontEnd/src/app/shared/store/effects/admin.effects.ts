import { Injectable, effect } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/core/services/auth.service";
import { adminLogin, adminLoginFailure, adminLoginSuccess } from "../actions/admin.action";
import { exhaustMap, map, catchError, of } from 'rxjs'
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class adminEffects {

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }


  _adminLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(adminLogin),
      exhaustMap((action) => {
        const data = action.logindata
        return this.authService.adminLogin(data).pipe(
          map((response: any) => {
            this.toastr.success("Welcome admin")
            localStorage.setItem('adminToken', response.access_token);
            this.router.navigateByUrl('/admin/dashboard')
            return adminLoginSuccess({ user: response.user })
          }),
          catchError(err => {
            console.log(err.error?.message)
            return of(adminLoginFailure())
          }))
      })
    )
  );
}