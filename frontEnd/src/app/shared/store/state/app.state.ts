import { adminStateInterface } from "../../interface/admin.interface";
import { clientStateInterface } from "../../interface/client.interface";
import { instructorStateInterface } from "../../interface/instructor.interface";
import { adminReducer } from "../reducers/admin.reducer";
import { clientReducer } from "../reducers/client.reducer";
import { instructorReducer } from "../reducers/instructor.reducer";


export interface appState {
    client: clientStateInterface,
    admin: adminStateInterface,
    instructor: instructorStateInterface
}

export const appReducer = {
    client: clientReducer,
    admin: adminReducer,
    instructor: instructorReducer
}