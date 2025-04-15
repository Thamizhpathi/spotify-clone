import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { updateUser } from "../controllers/user.controller.js";


const userRouter=Router()


userRouter.put('/updateuser/:id',authorize,updateUser)


export default userRouter