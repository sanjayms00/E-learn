import { studentInterface, instructorInterface } from "./common.interface";

export interface adminAuthResponse {
        _id: string,
        userName: string,
        email: string,
        status: boolean,
}

export interface adminStateInterface {
        user: adminAuthResponse,
        studentDetails: studentInterface[],
        instructorDetails: instructorInterface[]
}

export interface statusInterface {
        id: string,
        status: boolean
}

export interface dashboardResponse {
        student: countInterface[],
        instructor: countInterface[],
        graph: graphDataInterface[]
}

export interface graphDataInterface {
        _id: Date,
        count: number
}

export interface countInterface {
        _id: boolean,
        count: number
}