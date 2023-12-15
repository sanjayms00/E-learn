import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements DoCheck {
  togg = true
  icon = "/assets/logo/grid.svg"
  logSign = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngDoCheck(): void {
    if (this.authService.getClientToken()) {
      this.logSign = false
    } else {
      this.logSign = true
    }
  }


  toggleClick(event: HTMLElement) {
    this.togg = !this.togg
    event.classList.toggle('top-[15%]')
    if (this.togg) {
      this.icon = "/assets/logo/grid.svg";
    } else {
      this.icon = "/assets/logo/close.svg";
    }
  }

  logout() {
    const clientToken = this.authService.getClientToken()
    if (clientToken) {
      const status = this.authService.clientLogout()
      this.router.navigate(["/login"])
    }
  }


}
