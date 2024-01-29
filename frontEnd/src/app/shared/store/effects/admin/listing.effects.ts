import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  InstructorListFailed,
  InstructorListSuccess,
  StudentListFailed,
  StudentListSuccess,
  getInstructorList,
  getStudentList,
  instructorStatusChange,
  instructorStatusChangeFailed,
  instructorStatusChangeSuccess,
  studentStatusChange,
  studentStatusChangeFailed,
  studentStatusChangeSuccess,
} from '../../actions/admin.action';
import { exhaustMap, map, catchError, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ListingService } from 'src/app/core/services/admin/listing.service';
import { instructorInterface, studentInterface } from 'src/app/shared/interface/common.interface';
import { statusInterface } from 'src/app/shared/interface/admin.interface';

@Injectable()
export class listingEffects {
  constructor(
    private action$: Actions,
    private toastr: ToastrService,
    private ClientList: ListingService
  ) { }

  _getStudentsList$ = createEffect(() =>
    this.action$.pipe(
      ofType(getStudentList),
      exhaustMap(() => {
        return this.ClientList.getStudentList().pipe(
          map((response: studentInterface[]) => {
            return StudentListSuccess({ studentData: response });
          }),
          catchError((err) => {
            console.log(err.error?.message);
            return of(StudentListFailed());
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

  _ChangeStudentStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(studentStatusChange),
      switchMap((action: statusInterface) => {
        return this.ClientList.changeStudentStatus(action).pipe(
          map(() => {
            return studentStatusChangeSuccess(action);
          }),
          catchError((err) => {
            console.log(err.error?.message);
            return of(studentStatusChangeFailed());
          })
        );
      })
    )
  );

  _ChangeInstructorStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(instructorStatusChange),
      switchMap((action: statusInterface) => {
        return this.ClientList.changeInstructorStatus(action).pipe(
          map(() => {
            return instructorStatusChangeSuccess(action);
          }),
          catchError((err) => {
            console.log(err.error?.message);
            return of(instructorStatusChangeFailed());
          })
        );
      })
    )
  );


}
