import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const instructorGuard: CanActivateChildFn = (route, state) => {

  const authservice = inject(AuthService)
  const router = inject(Router)
  const token = authservice.getInstructorToken()
  
  // console.log(token)
  if (!token) {
    router.navigate(["/instructor/login"])
    return false
  }
  return true
};
