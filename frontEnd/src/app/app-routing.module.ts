import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { welcomeGuard } from './shared/guards/welcome.guard';


const routes: Routes = [
  { path: '', component: WelcomeComponent, canActivate: [welcomeGuard] },
  {
    path: '',
    loadChildren: () => import('./pages/client/client.module').then((m) => m.ClientModule)
  },
  {
    path: 'instructor',
    loadChildren: () => import('./pages/instructor/instructor.module').then((m) => m.InstructorModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule)
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
