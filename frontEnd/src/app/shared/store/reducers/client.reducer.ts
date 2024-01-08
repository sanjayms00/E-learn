import { createReducer, on } from "@ngrx/store";
import { clientLoginSuccess, clientSignUpSuccess, getClientDataFromLocal } from "../actions/client.action";
import { clientState } from "../state/client.state";


const _clientReducer = createReducer(clientState,
    on(
        clientLoginSuccess,
        getClientDataFromLocal,
        clientSignUpSuccess, (state, action) => {
            return {
                ...state,
                user: action.user
            }
        }),
)



export function clientReducer(state: any, action: any) {
    return _clientReducer(state, action)
}