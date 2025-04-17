import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../features/navbarSlicer"
import loginReducer from "../features/loginSlicer"
import homeReducer from "../features/homepagesSlicer"

const store=configureStore({
    reducer:{
        navbar:navReducer,
        login:loginReducer,
        home:homeReducer
    }
})
export default store