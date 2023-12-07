import { createReducer, on } from "@ngrx/store";
import { initialState, initialStateInterface } from "../state/main.state";
import { adminLoginSuccess } from "../actions/admin.action";
import { state } from "@angular/animations";

const _adminReducer = createReducer(initialState, on(
    adminLoginSuccess, (state, action) => {
        console.log(state, action)
        return {
            ...state
        }
    }
))



function admineducer(state: initialStateInterface, action: any){
    return _adminReducer(state, action)
}