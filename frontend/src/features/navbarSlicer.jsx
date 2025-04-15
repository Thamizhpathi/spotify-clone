import { createSlice } from "@reduxjs/toolkit";

const initialState={
    shownavbar:true,
    mobileScreen:false,
    dropDown:false


}

const navslice=createSlice({
    name:'navslice',
    initialState,
    reducers:{
        setnav(state,action){
            state.shownavbar=action.payload
        },
        setMobileScreen(state,action){
            state.mobileScreen=action.payload
        },
        setdropDown(state){
            state.dropDown=!state.dropDown
        }

    }
})
export const {setnav,setMobileScreen,setdropDown} =navslice.actions
export default navslice.reducer
