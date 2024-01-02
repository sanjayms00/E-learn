import { createAction, props } from "@ngrx/store";
import { studentInterface, loginInterface, instructorInterface } from "../../interface/common.interface";
import { adminAuthResponse, statusInterface } from "../../interface/admin.interface";


export const adminLogin = createAction('[Admin] login', props<{ logindata: loginInterface }>())
export const adminLoginSuccess = createAction('[Admin] login success', props<{ user: adminAuthResponse }>())
export const adminLoginFailure = createAction('[Admin] login failure')

//get client list for student and instructor
export const getStudentList = createAction('[Admin] student list')
export const StudentListSuccess = createAction('[Admin] student list success', props<{ studentData: studentInterface[] }>())
export const StudentListFailed = createAction('[Admin] student list failed')

//get client list for student and instructor
export const getInstructorList = createAction('[Admin] instructor list')
export const InstructorListSuccess = createAction('[Admin] instructor list success', props<{ instructorData: instructorInterface[] }>())
export const InstructorListFailed = createAction('[Admin] instructor list failed')

// chnage student Status
export const studentStatusChange = createAction('[Admin] student status Change', props<statusInterface>())
export const studentStatusChangeSuccess = createAction('[Admin] student status change success', props<statusInterface>())
export const studentStatusChangeFailed = createAction('[Admin] student status change failed')

// chnage instructor Status
export const instructorStatusChange = createAction('[Admin] instructor status Change', props<statusInterface>())
export const instructorStatusChangeSuccess = createAction('[Admin] instructor status change success', props<statusInterface>())
export const instructorStatusChangeFailed = createAction('[Admin] instructor status change failed')