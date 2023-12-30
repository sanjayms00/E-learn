import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { SearchComponent } from './search/search.component';
import { StreamVideoComponent } from './stream-video/stream-video.component';

import {TabViewModule} from 'primeng/tabview';
import { MyLearningComponent } from './my-learning/my-learning.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { ChatComponent } from './chat/chat.component';



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
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    ToastModule,
    TabViewModule
  ],
  providers: [
  ],
  
})
export class ClientModule { }
