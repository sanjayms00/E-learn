import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {path : '', component: ClientComponent},
  {path : 'admin', component: AdminComponent},
  // { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
