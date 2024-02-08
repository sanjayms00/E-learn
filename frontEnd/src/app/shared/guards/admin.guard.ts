import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const authservice = inject(AuthService)
  const router = inject(Router)
  const token = authservice.getAdminToken()

  if (!token) {
    router.navigate(["/admin/login"])
    return false
  }
  return true
};
