export type signUpType =  {
    fName : string,
    lName : string,
    email : string,
    password : string
}

export type loginType =  {
    id: number,
    email : string,
    password : string
}


export type userReturnType =  {
    _id: number,
    email : string,
    status: boolean,
    instructor: boolean
}

export type userAuthReturn = {
    access_token : string,
    user: userReturnType
}
