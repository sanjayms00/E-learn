import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService)
  const router = inject(Router)
  // console.log("inside canActivate", route, state)
  if (authservice.IsClientloggedIn()) {
    return true;
  } else {
    //const redirectUrl = state.url;
    // authService.login(redirectUrl);
    router.navigate(['/login'])
    return false;
  }
};
