import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';



@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService]
})
export class AdminModule { }
