import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { ClientLoginComponent } from './client-login/client-login.component';
import { authGuard } from 'src/app/shared/guards/admin/auth.guard';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { clientGuard } from 'src/app/shared/guards/client/client.guard';


const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: 'home', component: ClientHomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'signup', component: ClientSignupComponent, canActivate: [authGuard] },
      { path: 'login', component: ClientLoginComponent, canActivate: [authGuard] },
      { path: 'profile', component: ClientProfileComponent, canActivate: [clientGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
