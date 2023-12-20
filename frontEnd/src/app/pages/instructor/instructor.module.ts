import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorRoutingModule } from './instructor-routing-module';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';

@NgModule({
  declarations: [
    InstructorComponent,
    InstructorLoginComponent,
    InstructorSignupComponent,
    InstructorProfileComponent,
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule
  ]
})
export class InstructorModule { 

}
