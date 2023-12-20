import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorRoutingModule } from './instructor-routing-module';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MenubarModule} from 'primeng/menubar';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { ChartModule } from 'primeng/chart';
import { InstructorCourseCreateComponent } from './instructor-course-create/instructor-course-create.component';
import {StepsModule} from 'primeng/steps';

@NgModule({
  declarations: [
    InstructorComponent,
    InstructorLoginComponent,
    InstructorSignupComponent,
    InstructorProfileComponent,
    InstructorDashboardComponent,
    InstructorCourseCreateComponent,
    
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    ReactiveFormsModule,
    MenubarModule,
    ChartModule,
    StepsModule
  ]
})
export class InstructorModule { 

}
