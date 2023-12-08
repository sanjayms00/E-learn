export interface clientInterface {
    email: string;
    token: string;
    userName : string
}

export interface instructorInterface {
    _id : string,
    fName : string,
    lName : string,
    email : string,
    status : boolean,
    instructor : boolean
}
