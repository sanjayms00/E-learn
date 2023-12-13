
export interface userAuthResponse {
    _id : string,
    fName : string,
    lName : string,
    email : string,
    status : boolean,
    instructor : boolean,
}

export interface clientStateInterface {
    user : userAuthResponse
}

export interface signupInterface {
    fName: string,
    lName : string,
    email: string,
    password: string
}

export interface loginInterface {
    email: string,
    password: string
}

