import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { SearchComponent } from './search/search.component';
import { StreamVideoComponent } from './stream-video/stream-video.component';
import { MyLearningComponent } from './my-learning/my-learning.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { ChatComponent } from './chat/chat.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { OtpComponent } from './otp/otp.component';
import { FilterComponent } from './filter/filter.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CourseCardComponent } from 'src/app/shared/components/course-card/course-card.component';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';



@NgModule({
  declarations: [
    ClientLoginComponent,
    ClientSignupComponent,
    ClientHomeComponent,
    ClientProfileComponent,
    SearchComponent,
    StreamVideoComponent,
    MyLearningComponent,
    StudentInfoComponent,
    ChatComponent,
    CourseDetailsComponent,
    OtpComponent,
    FilterComponent,
    CheckoutComponent,
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RatingModule,
    SliderModule,
    ProgressBarModule
  ],
  providers: [
  ],

})
export class ClientModule { }
