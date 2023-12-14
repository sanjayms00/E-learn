import { adminStateInterface } from "../../interface/admin.interface";
import { clientStateInterface } from "../../interface/client.interface";
import { adminReducer } from "../reducers/admin.reducer";
import { clientReducer } from "../reducers/client.reducer";


export interface appState {
    client: clientStateInterface,
    admin: adminStateInterface
}

export const appReducer = {
    client: clientReducer,
    admin: adminReducer
}