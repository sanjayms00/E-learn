import { createFeatureSelector, createSelector } from "@ngrx/store";
import { instructorStateInterface } from "../../interface/instructor.interface";


export const instructor = createFeatureSelector<instructorStateInterface>('instructor')

export const getInstructor = createSelector(instructor, (state) => {
    return state.user
})


