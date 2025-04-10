import { Router } from "express";

import { signin, signup } from "../controllers/auth.controller.js";


const userrouter=Router()


userrouter.post('/sign-up',signup)
userrouter.post('/login',signin)

export default userrouter