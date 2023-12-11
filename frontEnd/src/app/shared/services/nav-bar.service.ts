import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  showNavbar !: BehaviorSubject<boolean>

  constructor() {
    this.showNavbar = new BehaviorSubject(true)
  }

  hide() {
    this.showNavbar.next(false)
  }

  display() {
    this.showNavbar.next(true)
  }
}
