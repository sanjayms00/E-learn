import { Course, studentInterface } from "./common.interface";


export interface clientStateInterface {
    user: studentInterface;
}


export interface homeInterface {
    courses: Course[],
    allCounts: {
        courseCount: number,
        categoryCount: number,
        ratingCount: number,
        instructorCount: number,
        studentCount: number
    }
}