import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { clientStatusChange, clientStatusChangeFailed, clientStatusChangeSuccess, getCientList, getCientListFailed, getCientListSuccess } from "../../actions/admin.action";
import { exhaustMap, map, catchError, of, switchMap } from 'rxjs'
import { ToastrService } from "ngx-toastr";
import { ListingService } from "src/app/core/services/admin/listing.service";
import { clientInterface } from "../../../interface/common.interface";
import { statusInterface } from "src/app/shared/interface/admin.interface";

@Injectable()
export class clientListEffects {

    constructor(
        private action$: Actions,
        private toastr: ToastrService,
        private ClientList: ListingService
    ) { }

    _getClientList$ = createEffect(() =>
        this.action$.pipe(
            ofType(getCientList),
            exhaustMap((action) => {
                return this.ClientList.getClientList().pipe(
                    map((response: clientInterface[]) => {
                        console.log("effect", response)
                        return getCientListSuccess({ ClientData: response })
                    }),
                    catchError(err => {
                        console.log(err.error?.message)
                        return of(getCientListFailed())
                    }))
            })
        )
    );

    _ChangeClientStatus$ = createEffect(() =>
        this.action$.pipe(
            ofType(clientStatusChange),
            switchMap((action: statusInterface) => {
                return this.ClientList.changeClientStatus(action).pipe(
                    map((response: any) => {
                        console.log(response)
                        return clientStatusChangeSuccess(action)
                    }),
                    catchError(err => {
                        console.log(err.error?.message)
                        return of(clientStatusChangeFailed())
                    }))
            })
        )
    );


}