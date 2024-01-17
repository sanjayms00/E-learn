import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { authGuard } from 'src/app/shared/guards/admin/auth.guard';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { clientGuard } from 'src/app/shared/guards/client/client.guard';
import { SearchComponent } from './search/search.component';
import { MyLearningComponent } from './my-learning/my-learning.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { ChatComponent } from './chat/chat.component';
// import { StreamVideoComponent } from './stream-video/stream-video.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { OtpComponent } from './otp/otp.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { StreamVideoComponent } from './stream-video/stream-video.component';
import { WelcomeComponent } from 'src/app/shared/components/welcome/welcome.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
// import { PaymentComponent } from './payment/payment.component';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'home', component: ClientHomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'signup', component: ClientSignupComponent, canActivate: [authGuard] },
      { path: 'login', component: ClientLoginComponent, canActivate: [authGuard] },
      { path: 'otp', component: OtpComponent },
      { path: 'search', component: SearchComponent },
      { path: 'courses', component: SearchComponent },
      {
        path: 'courses', children: [
          { path: 'details/:id', component: CourseDetailsComponent },
          { path: 'video/:id', component: StreamVideoComponent },
        ]
      },
      { path: 'checkout/:id', component: CheckoutComponent, canActivate: [clientGuard] },
      { path: 'success', component: SuccessComponent, canActivate: [clientGuard] },
      { path: 'cancel', component: CancelComponent, canActivate: [clientGuard] },
      { path: 'profile', component: StudentInfoComponent, canActivate: [clientGuard] },
      // { path: '', component: StudentInfoComponent },
      { path: 'learning', component: MyLearningComponent, canActivate: [clientGuard] },
      { path: 'communication', component: ChatComponent, canActivate: [clientGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
