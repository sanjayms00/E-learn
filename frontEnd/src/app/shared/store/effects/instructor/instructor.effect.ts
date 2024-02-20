import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../../../core/services/auth.service";

import { exhaustMap, map, catchError, of } from 'rxjs'
import { instructorLogin, instructorLoginFailure, instructorLoginSuccess, instructorSignUp, instructorSignUpFailure, instructorSignUpSuccess } from "../../actions/instructor.action"
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ChatService } from "src/app/shared/services/chat.service";


@Injectable()
export class instructorEffects {

  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private chatService: ChatService
  ) { }

  _instructorLogin$ = createEffect(() =>
    this.action$.pipe(
      ofType(instructorLogin),
      exhaustMap((action) => {
        const data = action.loginData
        return this.authService.instructorLogin(data).pipe(
          map((response: any) => {
            this.toastr.success("Login successfull")
            localStorage.setItem('instructorToken', response.access_token);
            localStorage.setItem('instructorData', JSON.stringify(response.user));

            this.router.navigateByUrl('/instructor/dashboard')
            return instructorLoginSuccess({ user: response.user })
          }),
          catchError(error => {
            console.log(`${error.error?.error} ${error.error?.message}`)
            return of(instructorLoginFailure())
          }))
      })
    )
  );


  _instructorSignUp$ = createEffect(() =>
    this.action$.pipe(
      ofType(instructorSignUp),
      exhaustMap((action) => {
        const data = action.signUpdata
        return this.authService.instructorSignUp(data).pipe(
          map((response: any) => {
            this.toastr.success("Login successfull")
            localStorage.setItem('instructorToken', response.access_token);
            localStorage.setItem('instructorData', JSON.stringify(response.user));

            this.router.navigateByUrl('/instructor/dashboard')
            return instructorSignUpSuccess({ user: response.user })
          }),
          catchError(error => {
            console.log(`${error.error?.error} ${error.error?.message}`)
            return of(instructorSignUpFailure())
          })
        )
      })
    )
  );




}