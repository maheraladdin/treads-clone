import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const generateTokenAndSetCookies = (userId: mongoose.Types.ObjectId, res: Response, rememberMe: boolean = false) => {
    const token = jwt.sign({
    userId
  }, process.env.JWT_SECRET!, {
    expiresIn: rememberMe ? "30d" : "1d" // 30 days or 1 day
  });
  res.cookie("token", token, {
    httpOnly: true, // this is to prevent XSS attacks
    maxAge: (rememberMe ? 30 : 1) * 24 * 60 * 60 * 1000, // 30 days or 1 day
    sameSite: "strict", // this is to prevent CSRF attacks
  });

  return token;
}

export default generateTokenAndSetCookies;