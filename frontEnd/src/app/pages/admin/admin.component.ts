import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Sidebar } from 'primeng/sidebar';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent {

  sidebarVisible: boolean = true;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ){}
  

  logout() {
    this.authService.adminLogout()
    this.toastr.success("Logout successful")
    this.router.navigateByUrl("/admin/login")
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

}

