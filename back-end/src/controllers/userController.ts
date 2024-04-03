import mongoose from 'mongoose';
import {NextFunction, Response, Request} from 'express';
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import {ProtectedRequest} from "../middlewares/protectRoute";
import bcrypt from "bcryptjs";

/**
 * @description Follow or unfollow a user
 * @param req {Request} - Request object
 * @param res {Response} - Response object
 * @param _ {NextFunction} - Next function
 */
const followHandler = async (req: Request, res: Response, _: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;
    const {id} = protectedRequest.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        res.status(400);
        throw new Error("Please provide a valid user id");
    }

    if(id === protectedRequest.user._id.toString()) {
        res.status(400);
        throw new Error("You cannot follow yourself");
    }

    const userToFollow = await User.findById(id);
    if (!userToFollow) {
        res.status(404);
        throw new Error("User not found");
    } else {
        // toggle follow
        // modify current user following and userToFollow followers
        if (protectedRequest.user.following.includes(id)) {
            await Promise.all([
                User.findByIdAndUpdate(protectedRequest.user._id, {$pull: {following: id}}),
                User.findByIdAndUpdate(id, {$pull: {followers: protectedRequest.user._id.toString()}})
            ]);
            res.status(200);
            res.json({message: "User unfollowed successfully"});
        } else {
            await Promise.all([
                User.findByIdAndUpdate(protectedRequest.user._id, {$push: {following: id}}),
                User.findByIdAndUpdate(id, {$push: {followers: protectedRequest.user._id.toString()}})
            ]);
            res.status(200);
            res.json({message: "User followed successfully"});
        }
    }
}

export const follow = asyncHandler(followHandler);

/**
 * @description Update user profile name, email, username, profilePic, bio
 * @param req
 * @param res
 * @param _
 */
const updateProfileHandler = async (req: Request, res: Response, _: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;

    const {name, email, username, profilePic, bio} = req.body;

    const user = await User.findById(protectedRequest.user._id);

    if(!user) {
        res.status(400);
        throw new Error("User not found");
    } else {

        if (name) user.name = name;
        if (email) user.email = email;
        if (username) user.username = username;
        if (profilePic) user.profilePic = profilePic;
        if (bio) user.bio = bio;

        const updatedUser = await user.save();

        res.status(200);
        res.json({
            message: "Profile updated successfully",
            data: updatedUser
        });
    }
}

export const updateProfile = asyncHandler(updateProfileHandler);

/**
 * @description Update user password
 * @param req
 * @param res
 * @param _
 */
const updatePasswordHandler = async (req: Request, res: Response, _: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;

    const {password, currentPassword} = req.body;

    if(!password || !currentPassword) {
        res.status(400);
        throw new Error("Please provide password and current password");
    }

    const user = await User.findById(protectedRequest.user._id);

    if(!user) {
        res.status(400);
        throw new Error("User not found");
    } else {
        const isMatch = bcrypt.compareSync(currentPassword, user.password);

        if (!isMatch) {
            res.status(400);
            throw new Error("Invalid credentials");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await User.findByIdAndUpdate(protectedRequest.user._id, {
            password: hashedPassword
        });

        res.status(200);
        res.json({
            message: "Password updated successfully",
        });
    }
}

export const updatePassword = asyncHandler(updatePasswordHandler);

/**
 * @description Get user profile
 * @param req
 * @param res
 * @param _
 */
const getUserProfileHandler = async (req: Request, res: Response, _: NextFunction) => {
    const {username} = req.params;
    if(!username) {
        res.status(400);
        throw new Error("Please provide a username");
    }

    const user = await User.findOne({username}).select("-password").select("-updatedAt");
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200);
    res.json({
        message: "User profile fetched successfully",
        data: user
    });
}

export const getUserProfile = asyncHandler(getUserProfileHandler);

const getLoggedUserHandler = async (req: Request, res: Response, _: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;

    const user = await User.findById(protectedRequest.user._id).select("-password").select("-updatedAt");
    if(!user) {
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200);
    res.json({
        message: "User profile fetched successfully",
        data: user
    });
}

export const getLoggedUser = asyncHandler(getLoggedUserHandler);
