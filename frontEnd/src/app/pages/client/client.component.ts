import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { categories } from 'src/app/shared/interface/common.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
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
  courseSearch: string = ''
  showMenu = false;
  categories: categories[] = []
  profileArr = ['profile', 'learning', 'certificates', 'communication']

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<appState>,
    private categoryService: CategoryService
  ) {
  }
  ngOnInit(): void {
    const clientData = this.authService.getLocalClientData()
    if (clientData) {
      this.store.dispatch(getClientDataFromLocal({ user: JSON.parse(clientData) }))
    }
    this.categoryService.getCategories().subscribe((res) => {
      this.categories = res
      console.log(this.categories)
    })
  }


  searchCourse() {
    console.log(this.courseSearch)
    this.router.navigate(['/search'])
  }


  toggleNavbar() {
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
