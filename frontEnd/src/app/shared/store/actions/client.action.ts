
import { createAction, props } from "@ngrx/store";
import { SignUpInterface, IUser } from "../../interface/common.interface";
import { clientStateInterface } from "../../interface/client.interface";

export const clientLogin = createAction('[Client] login', props<{ loginData: IUser }>())
export const clientLoginSuccess = createAction('[Client] login success', props<clientStateInterface>())
export const clientLoginFailure = createAction('[Client] login failure')


export const clientSignUp = createAction('[Client] SignUp', props<{ signUpdata: SignUpInterface }>())
export const clientSignUpSuccess = createAction('[Client] SignUp success', props<clientStateInterface>())
export const clientSignUpFailure = createAction('[Client] SignUp failure')

export const clientSignUpFirstStep = createAction('[Client] SignUp first Step')
export const OtpVerify = createAction('[Client] otp verification', props<{email: string, otp: number}>())

export const getClientDataFromLocal = createAction('[Client] Data from local', props<clientStateInterface>())