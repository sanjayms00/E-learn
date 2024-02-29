import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../../../core/services/auth.service";
import { adminLogin, adminLoginFailure, adminLoginSuccess } from "../../actions/admin.action";
import { exhaustMap, map, catchError, of } from 'rxjs'
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ListingService } from "../../../../core/services/admin/listing.service";

@Injectable()
export class adminEffects {

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private ClientList: ListingService
  ) { }

  _adminLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(adminLogin),
      exhaustMap((action) => {
        const data = action.loginData
        return this.authService.adminLogin(data).pipe(
          map((response: any) => {
            this.toastr.success("Welcome admin")
            localStorage.setItem('adminToken', response.access_token);
            this.router.navigateByUrl('/admin/dashboard')
            return adminLoginSuccess({ user: response.user })
          }),
          catchError(err => {
            return of(adminLoginFailure())
          }))
      })
    )
  );

}