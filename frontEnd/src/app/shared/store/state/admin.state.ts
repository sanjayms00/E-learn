import { adminStateInterface } from "../../interface/admin.interface";


export const adminState: adminStateInterface = {
    user: {
        _id: '',
        userName: '',
        email: '',
        status: false
    },
    studentDetails: [],
    instructorDetails: []
}