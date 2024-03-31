import {Request, Response, NextFunction} from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookies from "../utils/generateTokenAndSetCookies";

/**
 * @description Signup a user
 * @param req
 * @param res
 * @param next
 */
const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {name, email, password, username} = req.body;
    // get rememberMe from the request header
    const rememberMe = req.header("rememberMe") === "true";

    if(!name || !email || !password || !username) {
        res.status(400);
        res.json({
            message: "Invalid user data",
        });
    }

    const user = await User.exists({$or: [{email}, {username}]});

    if (user) {
        res.status(400);
        res.json({
            message: "User already exists",
        });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        username,
    });

    await newUser.save();

    if(newUser) {
        generateTokenAndSetCookies(newUser._id, res, rememberMe);
        res.status(201).json({
            message: "User created successfully",
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            },
        });
    }
    else
        res.status(400).json({
            message: "Invalid user data",
        });
}

export const signUp = asyncHandler(signupHandler);

const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {password, username} = req.body;
    // get rememberMe from the request header
    const rememberMe = req.header("rememberMe") === "true";

    if(!password || !username) {
        res.status(400);
        res.json({
            message: "Invalid user data",
        });
    }

    const user = await User.findOne({username});

    if (!user) {
        res.status(400);
        res.json({
            message: "User does not exist",
        });
    } else {
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            res.status(400);
            res.json({
                message: "Invalid credentials",
            });
        }

        generateTokenAndSetCookies(user?._id, res, rememberMe);
        res.status(201).json({
            message: "User created successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
            },
        });
    }
}

export const login = asyncHandler(loginHandler);