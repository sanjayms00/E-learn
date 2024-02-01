import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { StudentListComponent } from './student-list/student-list.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';
import { AdminComponent } from './admin.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryComponent } from './category/category.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [
    AdminLoginComponent,
    StudentListComponent,
    InstructorListComponent,
    SearchBarComponent,
    AdminComponent,
    AdminSidebarComponent,
    AdminNavbarComponent,
    TableComponent,
    SearchPipe,
    CategoryComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    SharedModule
  ],
  providers: [AuthService, ListingService]
})
export class AdminModule { }
