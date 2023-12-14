
export interface userAuthResponse {
    _id: string,
    fName: string,
    lName: string,
    email: string,
    status: boolean,
    instructor: boolean,
}

export interface clientStateInterface {
    user: userAuthResponse
}
