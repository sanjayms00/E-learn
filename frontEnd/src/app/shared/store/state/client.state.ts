import { clientStateInterface } from "../../interface/client.interface";


export const clientState: clientStateInterface = {
    user : {
        _id: '',
        fName: '',
        lName: '',
        email: '',
        status: false,
        instructor: false,
        password: "",
        createdAt: new Date,
        updatedAt: new Date
    }   
}