import user from "../models/users.module.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (await user.findOne({ email })) {
      const error = new Error("user already exist");
      error.status = 400;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await user.create([
      { name, email, password: hashedPassword },
    ]);
    const accessToken = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    console.log(token);

    res.status(201).json({
      success: true,
      message: "user signed in successfully",
      data: {
        accessToken,
        newUser,
      },
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const checkUser = await user.findOne({ email });

    if (!checkUser) {
      const error = new Error("user not found");
      error.status = 404;
      throw error;
    }
    const passwordValid = await bcrypt.compare(password, checkUser.password);

    if (!passwordValid) {
      const error = new Error("password not valid");
      error.status = 401;
      throw error;
    }
    const accessToken = jwt.sign({ userId: checkUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    const {  password: userPassword, ...userData } = checkUser.toObject();
    
    res
      .status(200)
      .json({
        message: "user loggedin successfully",
        data: { userData , accessToken },
      });
  } catch (error) {
    next(error);
  }
};
