import user from "../models/users.module.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";


export const updateUser =async(req,res,next)=>{

    try{
        const id=req.params.id
        const updatedDetails=req.body
        console.log("details",req.body)
        const updatedUser=await user.findByIdAndUpdate(id,updatedDetails,{new:true})
        
        if(!updatedUser){
            const error=new Error('user not found')
            res.statusCode=404
            throw error
        }

        res.status(201).json({message:'user details udated successfully',data:{updatedUser}})

    }catch(error){
        next(error)
    }

}