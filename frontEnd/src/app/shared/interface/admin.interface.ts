import { clientInterface } from "./common.interface";

export interface adminAuthResponse {
        _id: string,
        userName: string,
        email: string,
        status: boolean,
}

export interface adminStateInterface {
        user: adminAuthResponse,
        clientDetails: clientInterface[]
}

export interface statusInterface {
        id: string,
        status: boolean
}