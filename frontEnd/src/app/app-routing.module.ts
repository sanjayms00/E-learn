import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/client/client.module').then((m) => m.ClientModule)
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
