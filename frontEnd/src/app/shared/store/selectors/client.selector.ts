import { createFeatureSelector, createSelector } from "@ngrx/store";
import { clientStateInterface } from "../../interface/client.interface";



export const client = createFeatureSelector<clientStateInterface>('client')

export const getclient = createSelector(client, (state) => {
    return state.user
})


