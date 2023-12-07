import { createAction, props } from "@ngrx/store/src";
import { loginInterface } from "../../interface/common.interface";

export const clientLogin = createAction("[client] client login", props<{loginData: loginInterface}>())
export const clientLoginSuccess = createAction("[client] client login success", props<{token: string}>())
export const clientLoginFailure = createAction("[client] client login failure")