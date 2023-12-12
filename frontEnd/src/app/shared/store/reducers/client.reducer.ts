import { createReducer, on } from "@ngrx/store";
// import { initialState } from "../state/main.state";
import { clientLoginSuccess, clientSignUpSuccess } from "../actions/client.action";
import { clientState } from "../state/client.state";

const _clientReducer = createReducer(clientState, 
    on(clientLoginSuccess, (state, action) => {
        const token = action.token
        return {
            ...state,
            token
        }
    }),
    on(clientSignUpSuccess, (state, action) => {
        const token = action.token
        return {
            ...state,
            token
        }
    }),
)



export function clientReducer(state: any, action: any){
    return _clientReducer(state, action)
}