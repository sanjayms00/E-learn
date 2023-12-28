import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const clientGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService)
  const router = inject(Router)
  const token = authservice.getClientToken()

  if (!token) {
    router.navigate(["/"])
    return false
  }
  return true
};
