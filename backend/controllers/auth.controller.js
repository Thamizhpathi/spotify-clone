import user from "../models/users.module.js"
import bcrypt from "bcryptjs"




export const signup= async(req,res,next)=>{

    try{
        const {name,email,password}=req.body
       if( await user.findOne({email})){
        const error=new Error("user already exist")
        error.status=400
        throw error
       }
       const salt=await bcrypt.genSalt(10)
       const hashedPassword= await bcrypt.hash(password,salt)
       const newUser=await user.create([{name,email,password:hashedPassword}])
       

       res.status(201).json({message:"user created successfully", user:newUser})

    }catch(error){
        next(error)
    }
    
}
export const signin= async(req,res,next)=>{
    try{
        const {email,password}=req.body

        const checkUser=await user.findOne({email})

        if(!checkUser){
            const error=new Error("user not found")
            res.status=404
            throw error
        }
        const passwordValid= await bcrypt.compare(password,checkUser.password)
        
        if(!passwordValid){
            
            const error=new Error("password not valid")
            res.status=401
            throw error
        }
        res.status(200).json({message:"user loggedin successfully",data:checkUser})

    }
    catch(error){
        res
        .status(error.status || 500)
        .json({ message: error.message || "Signup failed" });
        console.log(error.message)
    }




}