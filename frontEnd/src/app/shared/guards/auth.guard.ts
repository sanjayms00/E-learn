import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService)
  const router = inject(Router)
  console.log(state.url.startsWith('/admin'))
  if (state.url.startsWith('/admin')) {
    if (authservice.getAdminToken()) {
      router.navigateByUrl("/admin/dashboard")
      return false
    }
    return true
  }
  else {
    if (authservice.getClientToken()) {
      router.navigateByUrl("/")
      return false;
    }
    return true;
  }

};
