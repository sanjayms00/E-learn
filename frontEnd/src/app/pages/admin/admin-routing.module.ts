import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { StudentListComponent } from './student-list/student-list.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { adminGuard } from 'src/app/shared/guards/admin/admin.guard';
import { authGuard } from 'src/app/shared/guards/admin/auth.guard';
import { CategoryComponent } from './category/category.component';

const adminRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: AdminLoginComponent, canActivate: [authGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: '',
        component: AdminComponent,
        canActivateChild: [adminGuard],
        children: [
          { path: 'dashboard', component: AdminHomeComponent },
          { path: 'students-list', component: StudentListComponent },
          { path: 'instructors-list', component: InstructorListComponent },
          { path: 'categories', component: CategoryComponent }
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
