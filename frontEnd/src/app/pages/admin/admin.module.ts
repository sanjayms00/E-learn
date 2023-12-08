import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentListComponent } from './student-list/stuent-list.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { AdminComponent } from './admin.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminHomeComponent,
    StudentListComponent,
    InstructorListComponent,
    SearchBarComponent,
    AdminComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
    TableComponent
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
