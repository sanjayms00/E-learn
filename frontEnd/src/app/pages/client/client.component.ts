import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { getClientDataFromLocal } from 'src/app/shared/store/actions/client.action';
import { appState } from 'src/app/shared/store/state/app.state';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, DoCheck {
  togg = true
  icon = "/assets/logo/grid.svg"
  logSign = false;

  
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<appState>
  ) {
  }
  ngOnInit(): void {
    const clientData = this.authService.getLocalClientData()
    if (clientData) {
      this.store.dispatch(getClientDataFromLocal({ user: JSON.parse(clientData) }))
    }
  }


  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
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
      this.authService.clientLogout()
      this.router.navigate(["/login"])
    }
  }


}
