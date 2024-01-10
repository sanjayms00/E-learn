import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorComponent } from './instructor.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorRoutingModule } from './instructor-routing-module';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { InstructorProfileComponent } from './instructor-profile/instructor-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { EditCourseComponent } from './edit-course/edit-course.component';



@NgModule({
  declarations: [
    InstructorComponent,
    InstructorLoginComponent,
    InstructorSignupComponent,
    InstructorProfileComponent,
    InstructorDashboardComponent,
    InstructorCoursesComponent,
    SpinnerComponent,
    EditCourseComponent,
    CreateCourseComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MenubarModule,
    ChartModule,
    CardModule,
    ProgressBarModule
  ],
  providers: [CourseService]
})
export class InstructorModule {

}
