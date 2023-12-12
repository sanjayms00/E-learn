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

  constructor(private authService: AuthService) {}

  //get auth service
  clientToken = this.authService.getClientToken()
  adminToken = this.authService.getAdminToken()

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.startsWith('/admin')){
      // clone and create new rrequest
      request = request.clone({
        setHeaders : {
          Authorization : `Bearer ${this.adminToken}`,
          'Role' : 'admin'
        }
      })
    }else{
      // clone and create new rrequest
      request = request.clone({
        setHeaders : {
          Authorization : `Bearer ${this.clientToken}`,
          'Role' : 'client'
        }
      })
    }
    

    // request = request.clone({
    //   setHeaders : {
    //     Authorization : `Bearer ${this.clientToken}`,
    //     'Role' : 'admin'
    //   }
    // })


    return next.handle(request);
  }
}
