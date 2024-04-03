import {Request, Response, NextFunction} from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcryptjs"
import {generateTokenAndSetCookies} from "../utils";

/**
 * @description Signup a user
 * @param req {Request} - Request object
 * @param res {Response} - Response object
 * @param _ {NextFunction} - Next function
 */
const signupHandler = async (req: Request, res: Response, _: NextFunction) => {
    const {name, email, password, username} = req.body;
    // get rememberMe from the request header
    const rememberMe = req.header("rememberMe") === "true";

    if(!name || !email || !password || !username) {
        res.status(400);
        throw new Error("Invalid user data");
    }

    const user = await User.exists({$or: [{email}, {username}]});

    if (user) {
        res.status(400);
        throw new Error("User already exists");
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
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}

export const signUp = asyncHandler(signupHandler);

/**
 * @description Login a user
 * @param req {Request} - Request object
 * @param res {Response} - Response object
 * @param _ {NextFunction} - Next function
 */
const loginHandler = async (req: Request, res: Response, _: NextFunction) => {
    const {password, username} = req.body;
    // get rememberMe from the request header
    const rememberMe = req.header("rememberMe") === "true";

    if(!password || !username) {
        res.status(400);
        throw new Error("Invalid credentials");
    }

    const user = await User.findOne({username});

    if (!user) {
        res.status(400);
        throw new Error("Invalid credentials");
    } else {
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            res.status(400);
            throw new Error("Invalid credentials");
        }

        generateTokenAndSetCookies(user?._id, res, rememberMe);
        res.status(201).json({
            message: "User logged in successfully",
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

/**
 * @description Logout a user
 * @param req
 * @param res
 * @param _
 */
const logoutHandler = async (req: Request, res: Response, _: NextFunction) => {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.status(200).json({
        message: "Logged out successfully",
    });
}

export const logout = asyncHandler(logoutHandler);