import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { StudentListComponent } from './student-list/student-list.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { AdminComponent } from './admin.component';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { ListingService } from '../../core/services/admin/listing.service';
import { CategoryComponent } from './category/category.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    AdminLoginComponent,
    StudentListComponent,
    InstructorListComponent,
    AdminComponent,
    SearchPipe,
    CategoryComponent,
    AdminDashboardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    SidebarModule
  ],
  providers: [AuthService, ListingService]
})
export class AdminModule { }
