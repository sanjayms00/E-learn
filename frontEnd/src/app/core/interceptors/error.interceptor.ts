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
      this.toastr.error(err.error?.error + " " + err.error?.message)
      if (err.status === 401) {
        this.authservice.clientLogout();
        this.router.navigate(['/'])
      }
      const error = err.error.message || err.statusText
      return throwError(() => Error(error))
    }))
  }
}
