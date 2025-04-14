import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:{
        "name":"",
        "email":"",
        "password":""
    },
    loggedUser:null,
    isloggedin:false
}

const loginSlicer=createSlice({
    name:"loginSlicer",
    initialState,
    reducers:{
        setvalue(state,action){
           const {name,value}=action.payload
           state.value[name]=value
        },
        setLoggedUser(state,action){
            state.loggedUser = action.payload;
        },
        setisLogedin(state,action){
            state.isloggedin=action.payload
        }
    }
})

export const {setvalue,setLoggedUser,setisLogedin} =loginSlicer.actions
export default loginSlicer.reducer