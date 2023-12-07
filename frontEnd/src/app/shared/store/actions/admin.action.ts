import { createAction, props } from "@ngrx/store";
import { loginInterface } from "../../interface/common.interface";


export const adminLogin = createAction('[Admin] admin login', props<loginInterface>())
export const adminLoginSuccess = createAction('[Admin] admin login success', props<{token : string}>())
export const adminLoginFailure = createAction('[Admin] admin login failure', props<{error : string}>())

export const getCientList = createAction('[Admin] client list')
export const getCientListSuccess = createAction('[Admin] client list success')
export const getCientListFailed = createAction('[Admin] client list failed')