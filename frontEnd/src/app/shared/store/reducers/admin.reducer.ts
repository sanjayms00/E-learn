import { createReducer, on } from "@ngrx/store";
import { InstructorListSuccess, StudentListSuccess, adminLoginSuccess, clientStatusChangeSuccess } from "../actions/admin.action";
import { adminState } from "../state/admin.state";

const _adminReducer = createReducer(adminState,
    on(adminLoginSuccess, (state, action) => {
        // console.log(state, action)
        return {
            ...state,
            user: action.user
        }
    }),
    on(StudentListSuccess, (state, action) => {
        console.log(state, action)
        return {
            ...state,
            studentDetails: action.studentData
        }
    }),
    on(InstructorListSuccess, (state, action) => {
        console.log(state, action)
        return {
            ...state,
            instructorDetails: action.instructorData
        }
    }),
    on(clientStatusChangeSuccess, (state, action) => {
        const userData = state.studentDetails.map((item)=> {
            if(item._id === action.id){
                return {...item, status: action.status}
            }else{
                return item
            }
        })
        return {
            ...state,
            clientDetails: userData
        }
    }),
);


export function adminReducer(state: any, action: any) {
    return _adminReducer(state, action)
}