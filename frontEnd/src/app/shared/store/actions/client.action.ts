import { createAction, props } from "@ngrx/store";
import { loginInterface } from "../../interface/common.interface";

export const clientLogin = createAction('[Admin] client login', props<{loginData: loginInterface}>())
export const clientLoginSuccess = createAction('[Admin] client login success', props<{token : string}>())
export const clientLoginFailure = createAction('[Admin] aclientmin login failure')
