import { createAction, props } from "@ngrx/store";
import { loginInterface } from "../../interface/common.interface";


export const adminLogin = createAction('[Admin] login', props<{logindata: loginInterface}>())
export const adminLoginSuccess = createAction('[Admin] login success', props<{token : string}>())
export const adminLoginFailure = createAction('[Admin] login failure')

export const getCientList = createAction('[Admin] client list')
export const getCientListSuccess = createAction('[Admin] client list success')
export const getCientListFailed = createAction('[Admin] client list failed')