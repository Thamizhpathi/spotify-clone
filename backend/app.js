import express from 'express'
import { PORT } from './config/env.js'
// import errorMiddleware from './middleware/error.middleware.js'
import { connectDb } from './database/connectdb.js'
import authRouter from './routes/login.route.js'
import cors from "cors";
import userRouter from './routes/user.route.js';
const app=express()
app.use(cors({
    origin: "http://localhost:5173", // allow frontend origin
    credentials: true               // allow cookies if needed
  }));
app.use(express.json())
// app.use(errorMiddleware)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/profile/user',userRouter)
  
app.listen(PORT,async()=>{
    console.log(`Server is running on ${PORT}`)
    await connectDb()
})