// noinspection TypeScriptValidateTypes

import {NextFunction, Response, Request} from "express";
import User from "../models/userModel";
import { Document } from 'mongoose';
import jwt from "jsonwebtoken";

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

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;
    try {
        const {token} = req.cookies;

        if(!token) {
            res.status(401);
            res.json({message: "Not authorized, no token"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtProps;

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            res.status(404);
            res.json({message: "User not found"});
        } else {
            protectedRequest.user = user;
        }
        next();

    } catch (error) {
        res.status(401);
        res.json({message: "Not authorized, token failed"});
    }
}

export default protectRoute;