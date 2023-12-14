
export interface adminAuthResponse {
        _id: string,
        userName: string,
        email: string,
        status: boolean,
}

export interface adminStateInterface {
        user: adminAuthResponse
}

