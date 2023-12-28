import { instructorStateInterface } from "../../interface/instructor.interface";

export const instructorState: instructorStateInterface = {
    user : {
        _id: '',
        fullName: '',
        email: '',
        status: false,
        mobile: '',
        createdAt: new Date,
        updatedAt: new Date
    }   
}