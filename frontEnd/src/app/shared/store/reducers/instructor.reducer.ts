import { createReducer, on } from "@ngrx/store";
import { instructorLoginSuccess, instructorSignUpSuccess, getinstructorDataFromLocal } from "../actions/instructor.action";
import { instructorState } from "../state/instructor.state";

const _instructorReducer = createReducer(instructorState,
    on(
        instructorLoginSuccess,
        getinstructorDataFromLocal,
        instructorSignUpSuccess, (state, action) => {
            return {
                ...state,
                user: action.user
            }
        })
)

export function instructorReducer(state: any, action: any) {
    return _instructorReducer(state, action)
}