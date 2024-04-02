// noinspection TypeScriptValidateTypes

import {NextFunction, Response, Request} from "express";
import User from "../models/userModel";
import { Document } from 'mongoose';
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

type jwtProps = {
    userId: string;
}

interface IUser {
  name: string;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  followers: string[];
  following: string[];
  bio: string;
}

type UserDocument = IUser & Document;

export type ProtectedRequest = Request & {
  user: UserDocument;
}

const protectRouteHandler = async (req: Request, res: Response, next: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;
    const {token} = req.cookies;

    if(!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtProps;

    const user = await User.findById(decoded.userId).select("-password");

    if(!user) {
        res.status(404);
        throw new Error("User not found");
    } else {
        protectedRequest.user = user;
    }
    next();
}

const protectRoute = asyncHandler(protectRouteHandler);

export default protectRoute;