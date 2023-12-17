import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
// import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  clientToken !: string | null
  adminToken !: string | null

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // debugger
    //get auth tokens
    this.clientToken = this.authService.getClientToken()
    this.adminToken = this.authService.getAdminToken()

    if (request.url.includes('/admin')) {
      // console.log("admin interceptor", this.adminToken)
      // clone and create new rrequest
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.adminToken}`,
          'Role': 'admin'
        }
      })
    } else {
      // console.log("client interceptor", this.clientToken)
      // clone and create new rrequest
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.clientToken}`,
          'Role': 'client'
        }
      })
    }
    return next.handle(request)
  }
}
