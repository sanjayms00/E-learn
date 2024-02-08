import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authservice = inject(AuthService)
  const router = inject(Router)

  const adminToken = authservice.getAdminToken()
  const instructorToken = authservice.getInstructorToken()
  const clientToken = authservice.getClientToken()

  if (state.url.startsWith('/admin')) {
    if (adminToken) {
      router.navigateByUrl("/admin/dashboard")
      return false
    }
    return true
  }
  else if (state.url.startsWith('/instructor')) {
    if (instructorToken) {
      router.navigateByUrl("/instructor/dashboard")
      return false
    }
    return true
  }
  else {
    if (clientToken) {
      router.navigateByUrl("/")
      return false;
    }
    return true;
  }

};
