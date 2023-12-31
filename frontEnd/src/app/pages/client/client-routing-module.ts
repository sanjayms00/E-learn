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
import { StreamVideoComponent } from './stream-video/stream-video.component';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: 'home', component: ClientHomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'signup', component: ClientSignupComponent, canActivate: [authGuard] },
      { path: 'login', component: ClientLoginComponent, canActivate: [authGuard] },
      { path: 'search', component: SearchComponent },
      { path: 'video', component: StreamVideoComponent, canActivate: [clientGuard] },
      {
        path: 'profile',
        component: ClientProfileComponent,
        canActivateChild: [clientGuard],
        children: [
          { path: '', component: StudentInfoComponent },
          { path: 'my-learning', component: MyLearningComponent },
          { path: 'chat', component: ChatComponent },
        ]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
