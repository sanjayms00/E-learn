import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { authGuard } from 'src/app/shared/guards/auth.guard';
import { InstructorComponent } from './instructor.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { instructorGuard } from 'src/app/shared/guards/instructor/instructor.guard';
import { authGuard } from 'src/app/shared/guards/admin/auth.guard';
import { CreateCourseComponent } from './create-course/create-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { CourseBuildComponent } from './course-build/course-build.component';

import { CourseInformationComponent } from './course-build/course-information/course-information.component';

import { CourseContentComponent } from './course-build/course-content/course-content.component';
import { CoursePreviewComponent } from './course-build/course-preview/course-preview.component';


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
          { path: 'courses', component: InstructorCoursesComponent },
          //{ path: 'create', component: CreateCourseComponent },
          { path: 'edit/:id', component: EditCourseComponent },
          {
            path: 'create', component: CourseBuildComponent,
            children: [
              { path: 'information', component: CourseInformationComponent },
              { path: '', redirectTo: 'information', pathMatch: 'full' },
              { path: 'content', component: CourseContentComponent },
              { path: 'preview', component: CoursePreviewComponent },
            ]
          },
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
