import { clientStateInterface } from "../../interface/client.interface";


export const clientState: clientStateInterface = {
    user : {
        _id: '',
        fullName: '',
        email: '',
        status: false,
        mobile: 0,
        createdAt: new Date,
        updatedAt: new Date
    }   
}