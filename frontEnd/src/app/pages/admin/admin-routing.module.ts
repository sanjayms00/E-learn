import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { StudentListComponent } from './student-list/stuent-list.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { adminAuthGuard } from 'src/app/shared/guards/admin-auth.guard';

const adminRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: AdminLoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: '',
        canActivate: [adminAuthGuard],
        component: AdminComponent,
        children: [
          { path: 'dashboard', component: AdminHomeComponent },
          { path: 'students-list', component: StudentListComponent },
          { path: 'instructors-list', component: InstructorListComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
