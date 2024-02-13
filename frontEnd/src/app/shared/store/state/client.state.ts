import { clientStateInterface } from "../../interface/client.interface";


export const clientState: clientStateInterface = {
    user: {
        _id: '',
        fullName: '',
        email: '',
        image: '',
        status: false,
        mobile: '',
        createdAt: new Date,
        updatedAt: new Date
    }
}