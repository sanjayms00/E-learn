
import { createAction, props } from "@ngrx/store";
import { SignUpInterface, loginInterface } from "../../interface/common.interface";
import { instructorStateInterface } from "../../interface/instructor.interface";

export const instructorLogin = createAction('[instructor] login', props<{loginData: loginInterface}>())
export const instructorLoginSuccess = createAction('[instructor] login success', props<instructorStateInterface>())
export const instructorLoginFailure = createAction('[instructor] login failure')


export const instructorSignUp = createAction('[instructor] SignUp', props<{signUpdata: SignUpInterface}>())
export const instructorSignUpSuccess = createAction('[instructor] SignUp success', props<instructorStateInterface>())
export const instructorSignUpFailure = createAction('[instructor] SignUp failure')


export const getinstructorDataFromLocal = createAction('[instructor] Data from local', props<instructorStateInterface>())