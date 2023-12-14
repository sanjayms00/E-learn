import { createAction, props } from "@ngrx/store";
import { loginInterface } from "../../interface/common.interface";
import { adminStateInterface } from "../../interface/admin.interface";


export const adminLogin = createAction('[Admin] login', props<{ logindata: loginInterface }>())
export const adminLoginSuccess = createAction('[Admin] login success', props<adminStateInterface>())
export const adminLoginFailure = createAction('[Admin] login failure')

export const getCientList = createAction('[Admin] client list')
export const getCientListSuccess = createAction('[Admin] client list success')
export const getCientListFailed = createAction('[Admin] client list failed')