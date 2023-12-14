import { createReducer, on } from "@ngrx/store";
import { adminLoginSuccess } from "../actions/admin.action";
import { adminState } from "../state/admin.state";

const _adminReducer = createReducer(adminState,
    on(adminLoginSuccess, (state, action) => {
        console.log(state, action)
        return {
            ...state,
            user: action.user
        }
    }
    ));


export function adminReducer(state: any, action: any) {
    return _adminReducer(state, action)
}