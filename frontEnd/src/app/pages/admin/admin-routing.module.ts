import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { StuentListComponent } from './stuent-list/stuent-list.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';


const adminRoutes: Routes = [
  {
    path: 'admin', 
    component: AdminComponent, 
    children: [
      {path: 'dashboard', title: 'dashboard', component: AdminHomeComponent},
      {path: 'login', component: AdminLoginComponent},
      {path: 'student-list', component: StuentListComponent},
      {path: 'instructor-list', component: InstructorListComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
