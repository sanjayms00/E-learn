import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuard } from 'src/app/shared/guards/auth.guard';
import { InstructorComponent } from './instructor.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { instructorGuard } from 'src/app/shared/guards/instructor.guard';
import { authGuard } from 'src/app/shared/guards/auth.guard';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseContentComponent } from './edit-course-content/edit-course-content.component';
import { formLeaveGuard } from 'src/app/shared/guards/form-leave.guard';
import { InstructorChatComponent } from './instructor-chat/instructor-chat.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'signup', component: InstructorSignupComponent, canActivate: [authGuard] },
      { path: 'login', component: InstructorLoginComponent, canActivate: [authGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: '',
        component: InstructorComponent,
        canActivateChild: [instructorGuard],
        children: [
          { path: 'profile', component: InstructorProfileComponent },
          { path: 'dashboard', component: InstructorDashboardComponent },
          { path: 'chat', component: InstructorChatComponent },
          { path: 'courses', component: InstructorCoursesComponent },
          { path: 'edit/:id', component: EditCourseComponent, canDeactivate: [formLeaveGuard] },
          { path: 'edit/content/:id', component: EditCourseContentComponent, canDeactivate: [formLeaveGuard] },
          { path: 'create', component: CreateCourseComponent, canDeactivate: [formLeaveGuard] }
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
