import mongoose from "mongoose";


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true
       
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Number
    },
    month:{
        type:String
    },
    year:{
        type:Number
    },
    gender:{
        type:String
    }
})
const user=mongoose.model('user',userSchema)
export default user