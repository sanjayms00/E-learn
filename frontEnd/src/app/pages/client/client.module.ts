import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientSignupComponent } from './client-signup/client-signup.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientLoginComponent } from './client-login/client-login.component';

@NgModule({
  declarations: [
    ClientLoginComponent,
    ClientSignupComponent,
    ClientHomeComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
})
export class ClientModule { }
