export type signUpType = {
    fName: string,
    lName: string,
    email: string,
    password: string
}

export type loginType = {
    id: number,
    email: string,
    password: string
}


export type userReturnType = {
    _id: number,
    fullName: string,
    email: string,
    status: boolean,
    mobile: number
}

export type userAuthReturn = {
    access_token: string,
    user: userReturnType
}


export type videoType = {
    _id: string,
    instructorId: string,
    index: number,
    title: string,
    description: string,
    file: string,
    createdAt: Date,
    updatedAt: Date,
    videoUrl ?: string
}