import { createSlice } from "@reduxjs/toolkit"

const alert = createSlice({
    name: "info alert",
    initialState: {alertState: false, message: {title: "", messageType: ""}},
    reducers: {
        setAlert(state, action){
            state.alertState = true
            state.message = action.payload
        },
        closeAlert(state, action){
            state.alertState = false
        }
    }

})

export const alertActions = alert.actions;
export const alertReducer = alert.reducer;