export interface loginInterface {
    email : string;
    password : string;
}


export interface SignUpInterface {
    fName : string;
    lName : string;
    email : string;
    password : string;
}



export interface clientInterface {
    fName : string,
    lName : string,
    email : string,
    password : string,
    instructor : boolean
    status : boolean,
    createdAt : Date
    updatedAt : Date
}