import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { constant } from '../constant/constant';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authservice: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //handle error response
    return next.handle(request).pipe(catchError((err) => {
      this.toastr.error(err.error?.message)
      const baseUrl = constant.baseUrl + '/';

      if (err.status === 401) {
        const restOfTheString = err.url.substring(baseUrl.length);

        if (restOfTheString.startsWith('instructor')) {
          this.authservice.instructorLogout();
          this.router.navigate(['/instructor/login'])
        }
        else if (restOfTheString.startsWith('student')) {
          this.authservice.clientLogout();
          this.router.navigate(['/login'])
        }

      }
      const error = err.error.message || err.statusText
      return throwError(() => Error(error))
    }))
  }
}
