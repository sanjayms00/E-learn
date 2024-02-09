import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  clientToken !: string | null
  adminToken !: string | null
  instructorToken!: string | null

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // debugger
    //get auth tokens
    this.clientToken = this.authService.getClientToken()
    this.adminToken = this.authService.getAdminToken()
    this.instructorToken = this.authService.getInstructorToken()

    if (request.url.includes('/admin')) {
      // clone and create new request
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.adminToken}`,
          'Role': 'admin'
        }
      })
    } else if (request.url.includes('/instructor')) {
      // clone and create new request
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.instructorToken}`,
          'Role': 'instructor'
        }
      })
    } else {
      // clone and create new request
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
