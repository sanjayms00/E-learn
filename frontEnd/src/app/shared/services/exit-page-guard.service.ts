import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

export interface IDeactivateComponent {
  canExit: () => boolean | Observable<boolean> | Promise<boolean>
}


@Injectable({
  providedIn: 'root'
})
export class ExitPageGuardService implements CanDeactivate<IDeactivateComponent> {

  constructor() { }

  canDeactivate(component: IDeactivateComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) {
    return component.canExit()
  }
}
