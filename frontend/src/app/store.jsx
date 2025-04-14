import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../features/navbarSlicer"
import loginReducer from "../features/loginSlicer"


const store=configureStore({
    reducer:{
        navbar:navReducer,
        login:loginReducer
    }
})
export default store