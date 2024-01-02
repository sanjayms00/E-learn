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
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
  ],

})
export class ClientModule { }
