import { createSlice } from "@reduxjs/toolkit";

const initialState={
    shownavbar:true,
    mobileScreen:false


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
        }

    }
})
export const {setnav,setMobileScreen} =navslice.actions
export default navslice.reducer
