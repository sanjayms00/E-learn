// import { createSelector } from "@ngrx/store";
import { appState } from "../state/app.state";


export const adminUserselector = (state: appState) => state.admin.user

export const studentlistSelector = (state: appState) => state.admin.studentDetails

export const instructorlistSelector = (state: appState) => state.admin.instructorDetails



