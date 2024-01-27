import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const welcomeGuard: CanActivateFn = (route, state) => {

  const authservice = inject(AuthService)
  const router = inject(Router)

  const instructorToken = authservice.getInstructorToken()
  const clientToken = authservice.getClientToken()

  if (instructorToken || clientToken) {
    router.navigateByUrl('/home')
    return false
  }
  return true

};
