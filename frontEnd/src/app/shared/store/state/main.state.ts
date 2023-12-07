import { adminInterface } from "../../interface/admin.interface";
import { clientInterface } from "../../interface/client.interface";
import { adminState } from "./admin.state";
import { clientState } from "./client.state";

export interface initialStateInterface {
    client: clientInterface,
    admin : adminInterface
}


export const initialState: initialStateInterface = {
    client : clientState,
    admin : adminState
}