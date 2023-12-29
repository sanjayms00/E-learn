import { studentInterface, instructorInterface } from "./common.interface";

export interface adminAuthResponse {
        _id: string,
        userName: string,
        email: string,
        status: boolean,
}

export interface adminStateInterface {
        user: adminAuthResponse,
        clientDetails: studentInterface[],
        instructorDetails: instructorInterface[]
}

export interface statusInterface {
        id: string,
        status: boolean
}