import { createAction, props } from "@ngrx/store";
import { SignUpInterface, loginInterface } from "../../interface/common.interface";
import { clientStateInterface } from "../../interface/client.interface";

export const clientLogin = createAction('[Client] login', props<{loginData: loginInterface}>())
export const clientLoginSuccess = createAction('[Client] login success', props<clientStateInterface>())
export const clientLoginFailure = createAction('[Client] login failure')


export const clientSignUp = createAction('[Client] SignUp', props<{signUpdata: SignUpInterface}>())
export const clientSignUpSuccess = createAction('[Client] SignUp success', props<clientStateInterface>())
export const clientSignUpFailure = createAction('[Client] SignUp failure')
