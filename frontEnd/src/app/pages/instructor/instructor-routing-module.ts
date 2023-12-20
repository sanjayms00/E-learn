import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuard } from 'src/app/shared/guards/auth.guard';
import { InstructorComponent } from './instructor.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'signup', component: InstructorSignupComponent },
      { path: 'login', component: InstructorLoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: '',
        component: InstructorComponent,
        children : [
          {path: 'profile', component:InstructorProfileComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
