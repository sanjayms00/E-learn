import { createReducer, on } from "@ngrx/store";
// import { initialState } from "../state/main.state";
import { clientLoginSuccess, clientSignUpSuccess } from "../actions/client.action";
import { clientState } from "../state/client.state";

const _clientReducer = createReducer(clientState, 
    on(clientLoginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
    on(clientSignUpSuccess, (state, action) => {
        return {
            ...state,
            user: action.user
        }
    }),
)



export function clientReducer(state: any, action: any){
    return _clientReducer(state, action)
}