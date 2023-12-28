// import { createSelector } from "@ngrx/store";
import { appState } from "../state/app.state";


export const adminUserselector = (state: appState) => state.admin.user

// export const studentlistSelector = (state: appState) => state.admin.clientDetails.filter(item => item.instructor === false)

// export const instructorlistSelector = (state: appState) => state.admin.clientDetails.filter(item => item.instructor === true)



