import { createReducer, on } from "@ngrx/store";
import { InstructorListSuccess, StudentListSuccess, adminLoginSuccess, instructorStatusChangeSuccess, studentStatusChangeSuccess } from "../actions/admin.action";
import { adminState } from "../state/admin.state";

const _adminReducer = createReducer(adminState,
    on(adminLoginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(StudentListSuccess, (state, action) => {
        return {
            ...state,
            studentDetails: action.studentData
        }
    }),
    on(InstructorListSuccess, (state, action) => {
        return {
            ...state,
            instructorDetails: action.instructorData
        }
    }),
    on(studentStatusChangeSuccess, (state, action) => {
        const userData = state.studentDetails.map((item) => {
            if (item._id === action.id) {
                return { ...item, status: action.status }
            } else {
                return item
            }
        })
        return {
            ...state,
            studentDetails: userData
        }
    }),
    on(instructorStatusChangeSuccess, (state, action) => {
        const userData = state.instructorDetails.map((item) => {
            if (item._id === action.id) {
                return { ...item, status: action.status }
            } else {
                return item
            }
        })
        return {
            ...state,
            instructorDetails: userData
        }
    }),
);


export function adminReducer(state: any, action: any) {
    return _adminReducer(state, action)
}