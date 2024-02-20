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
    _id: string,
    fullName: string
    email: string,
    headline: string,
    biography: string,
    twitter: string,
    facebook: string,
    instagram: string,
    linkedin: string,
    website: string,
    image: string,
    mobile: number,
    status: boolean
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
    videoUrl?: string
}