import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if(!DB_URI){
    console.log("the dburl is not found")
}

export const connectDb=async()=>{
    try{

        await mongoose.connect(DB_URI)
        console.log("connected to database successfully")
    }
    catch(error){
        console.log(error)
    }
}