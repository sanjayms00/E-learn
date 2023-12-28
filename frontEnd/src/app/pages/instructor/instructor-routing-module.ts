import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuard } from 'src/app/shared/guards/auth.guard';
import { InstructorComponent } from './instructor.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorCourseCreateComponent } from './instructor-course-create/instructor-course-create.component';
import { CourseOverViewComponent } from './instructor-course-create/course-over-view/course-over-view.component';
import { CourseContentComponent } from './instructor-course-create/course-content/course-content.component';
import { CourseInfoComponent } from './instructor-course-create/course-info/course-info.component';
import { CourseOptionsComponent } from './instructor-course-create/course-options/course-options.component';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { instructorGuard } from 'src/app/shared/guards/instructor/instructor.guard';
import { authGuard } from 'src/app/shared/guards/admin/auth.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'signup', component: InstructorSignupComponent, canActivate: [authGuard] },
      { path: 'login', component: InstructorLoginComponent, canActivate : [authGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: '',
        component: InstructorComponent,
        canActivateChild: [instructorGuard],
        children : [
          {path: 'profile', component:InstructorProfileComponent},
          {path: 'dashboard', component:InstructorDashboardComponent},
          {path: 'courses', component:InstructorCoursesComponent},
          {
            path: 'create',
            component: InstructorCourseCreateComponent,
            children: [
              {path: 'information', component:CourseInfoComponent},
              {path: 'options', component:CourseOptionsComponent},
              {path: 'content', component:CourseContentComponent},
              {path: 'overview', component:CourseOverViewComponent},
            ]
          }
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
