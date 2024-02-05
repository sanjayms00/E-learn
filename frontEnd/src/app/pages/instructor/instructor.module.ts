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
import { CardModule } from 'primeng/card';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { CourseService } from 'src/app/core/services/instructor/course.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditCourseContentComponent } from './edit-course-content/edit-course-content.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { NumericDirective } from 'src/app/shared/customeDirectives/numeric.directive';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardBoxComponent } from 'src/app/shared/components/dashboard-box/dashboard-box.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { formLeaveGuard } from 'src/app/shared/guards/instructor/form-leave.guard';

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
    CreateCourseComponent,
    EditCourseContentComponent,
    NumericDirective,
    DashboardBoxComponent,

  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MenubarModule,
    CardModule,
    ProgressBarModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    SharedModule,
    SidebarModule,
    RippleModule,
    AvatarModule,
    PanelMenuModule,
    MultiSelectModule,
    InputTextModule,
    InputTextareaModule,
    EditorModule,
    InputMaskModule
  ],
  providers: [CourseService]
})
export class InstructorModule {

}
