import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentLoginComponent } from './student-login/student-login.component';
import { ClientRoutingModule } from './client-routing-module';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentLoginComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule
  ],
  
})
export class ClientModule { }
