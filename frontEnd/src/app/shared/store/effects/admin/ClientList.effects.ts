import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    InstructorListFailed,
    InstructorListSuccess,
  clientStatusChange,
  clientStatusChangeFailed,
  clientStatusChangeSuccess,
  getCientList,
  getCientListFailed,
  getCientListSuccess,
  getInstructorList,
} from '../../actions/admin.action';
import { exhaustMap, map, catchError, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { instructorInterface, studentInterface } from 'src/app/shared/interface/common.interface';
import { statusInterface } from 'src/app/shared/interface/admin.interface';

@Injectable()
export class clientListEffects {
  constructor(
    private action$: Actions,
    private toastr: ToastrService,
    private ClientList: ListingService
  ) {}

  _getStudentsList$ = createEffect(() =>
    this.action$.pipe(
      ofType(getCientList),
      exhaustMap(() => {
        return this.ClientList.getStudentList().pipe(
          map((response: studentInterface[]) => {
         
            return getCientListSuccess({ ClientData: response });
          }),
          catchError((err) => {
            console.log(err.error?.message);
            return of(getCientListFailed());
          })
        );
      })
    )
  );

  _getInstructorList = createEffect(() =>
    this.action$.pipe(
      ofType(getInstructorList),
      exhaustMap(() => {
        return this.ClientList.getInstructorList().pipe(
          map((response: instructorInterface[]) => {
            // console.log("instructor", response)
            return InstructorListSuccess({ instructorData: response });
          }),
          catchError((err) => {
            console.log(err.error?.message);
            return of(InstructorListFailed());
          })
        );
      })
    )
  );

  _ChangeClientStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(clientStatusChange),
      switchMap((action: statusInterface) => {
        return this.ClientList.changeClientStatus(action).pipe(
          map((response: any) => {
           
            return clientStatusChangeSuccess(action);
          }),
          catchError((err) => {
            console.log(err.error?.message);
            return of(clientStatusChangeFailed());
          })
        );
      })
    )
  );
}
