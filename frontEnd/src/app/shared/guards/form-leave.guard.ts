import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface IDeactivateComponent {
  canExit: () => boolean | Observable<boolean> | Promise<boolean>
}



export const formLeaveGuard: CanDeactivateFn<IDeactivateComponent> = (component, currentRoute, currentState, nextState) => {

  return component.canExit();
};
