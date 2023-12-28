import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorRoutingModule } from './instructor-routing-module';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MenubarModule} from 'primeng/menubar';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { ChartModule } from 'primeng/chart';
import { InstructorCourseCreateComponent } from './instructor-course-create/instructor-course-create.component';
import {StepsModule} from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { CourseInfoComponent } from './instructor-course-create/course-info/course-info.component';
import { CourseOptionsComponent } from './instructor-course-create/course-options/course-options.component';
import { CourseContentComponent } from './instructor-course-create/course-content/course-content.component';
import { CourseOverViewComponent } from './instructor-course-create/course-over-view/course-over-view.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';


@NgModule({
  declarations: [
    InstructorComponent,
    InstructorLoginComponent,
    InstructorSignupComponent,
    InstructorProfileComponent,
    InstructorDashboardComponent,
    InstructorCourseCreateComponent,
    CourseInfoComponent,
    CourseOptionsComponent,
    CourseContentComponent,
    CourseOverViewComponent,
    InstructorCoursesComponent,
    
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MenubarModule,
    ChartModule,
    StepsModule,
    ToastModule,
    ButtonModule,
    CardModule
  ]
})
export class InstructorModule { 

}
