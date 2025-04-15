// import user from "../models/users.module.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import user from "../models/users.module.js";



const authorize=async(req,res,next)=>{
    try{
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
          }
      
        if(!token){
            return res.status(401).json({message:"unauthorized"})
        }
        const decoded=jwt.verify(token,JWT_SECRET)
        const User= await user.findById(decoded.userId)
        if(!User){
            return res.status(401).json({message:"unauthorized"})
        }
        req.user=User
        next()
    }catch(error){
        res.status(401).json({message:'unauthorized', error:error.message})
    }
    
}

export default authorize