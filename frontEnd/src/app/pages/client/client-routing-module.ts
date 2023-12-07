import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { ClientLoginComponent } from './client-login/client-login.component';

const routes: Routes = [
  {
    path : '', 
    component: ClientComponent, 
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: ClientHomeComponent},
      {path: 'signup', component: ClientSignupComponent},
      {path: 'login', component: ClientLoginComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
