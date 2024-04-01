import asyncHandler from "express-async-handler";
import {NextFunction, Request, Response} from "express";
import Post from "../models/postModel";
import {ProtectedRequest} from "../middlewares/protectRoute";

const MAX_LENGTH = 500;

/**
 * @description Create a post
 * @param req
 * @param res
 * @param _
 */
const createPostHandler = async (req: Request, res: Response, _: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;

    const {text, img} = protectedRequest.body;

    if (!text) {
        res.status(400);
        throw new Error("Please provide text");
    }

    if (text.length > MAX_LENGTH) {
        res.status(400);
        throw new Error(`Text must be at most ${MAX_LENGTH} characters`);
    }


    const post = await Post.create({
        author: protectedRequest.user._id,
        text,
        img
    });

    res.status(201).json({
        message: "Post created successfully",
        data: post
    });
}

export const createPost = asyncHandler(createPostHandler);