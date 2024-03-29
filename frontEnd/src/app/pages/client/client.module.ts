import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { SearchComponent } from './search/search.component';
import { StreamVideoComponent } from './stream-video/stream-video.component';
import { MyLearningComponent } from './my-learning/my-learning.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { OtpComponent } from './otp/otp.component';
import { FilterComponent } from './filter/filter.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CourseCardComponent } from '../../shared/components/course-card/course-card.component';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { NgOtpInputModule } from 'ng-otp-input';
import { CancelComponent } from './cancel/cancel.component';
import { SuccessComponent } from './success/success.component';
import { ClientSearchBarComponent } from '../../shared/components/client-search-bar/client-search-bar.component';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../shared/modules/shared.module';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ImageCropperModule } from 'ngx-image-cropper';
import { StudentChatComponent } from './student-chat/student-chat.component';
import { ClientComponent } from './client.component';

@NgModule({
  declarations: [
    ClientLoginComponent,
    ClientSignupComponent,
    ClientHomeComponent,
    SearchComponent,
    StreamVideoComponent,
    MyLearningComponent,
    StudentInfoComponent,
    CourseDetailsComponent,
    OtpComponent,
    FilterComponent,
    CheckoutComponent,
    CourseCardComponent,
    CancelComponent,
    SuccessComponent,
    ClientSearchBarComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    StudentChatComponent,
    ClientComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RatingModule,
    SliderModule,
    ProgressBarModule,
    NgOtpInputModule,
    AccordionModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    SharedModule,
    DialogModule,
    DropdownModule,
    ImageCropperModule,
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 20,
      titleFontSize: '100',
      innerStrokeWidth: 5,
      outerStrokeColor: "#000",
      innerStrokeColor: "#000",
      animationDuration: 300,
      animation: true,
      showSubtitle: false,
      showUnits: false,
      responsive: true
    })

  ],
  providers: []

})
export class ClientModule { }
