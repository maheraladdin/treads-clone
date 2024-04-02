import asyncHandler from "express-async-handler";
import {NextFunction, Request, Response} from "express";
import Post from "../models/postModel";
import {ProtectedRequest} from "../middlewares/protectRoute";

const MAX_LENGTH = 500;

const getPostHandler = async (req: Request, res: Response, _: NextFunction) => {
    const {id} = req.params;

    const post = await Post.findById(id).populate("author", "username");

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    res.status(200).json({
        message: "Post retrieved successfully",
        data: post
    });
}

export const getPost = asyncHandler(getPostHandler);

const getFeedHandler = async (req: Request, res: Response, _: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;

    const feedPosts = await Post.find({
        author: {
            $in: [...protectedRequest.user.following, protectedRequest.user._id]
        }
    }).sort({createdAt: -1}).populate("author", "username profilePic");

    res.status(200).json({
        message: "Feed retrieved successfully",
        data: feedPosts
    });
}

export const getFeed = asyncHandler(getFeedHandler);

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

const deletePostHandler = async (req: Request, res: Response, _: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;
    const {id} = protectedRequest.params;

    const post = await Post.findById(id);

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    if (post.author.toString() !== protectedRequest.user._id.toString()) {
        res.status(401);
        throw new Error("You are not authorized to delete this post");
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
        message: "Post deleted successfully"
    });
}

export const deletePost = asyncHandler(deletePostHandler);

const likePostHandler = async (req: Request, res: Response, _: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;
    const {id} = protectedRequest.params;

    const post = await Post.findById(id).select("likes");

    if (!post) {
        res.status(404);
        throw new Error("Post not found");
    }

    if (post.likes.includes(protectedRequest.user._id)) {
        const post = await Post.findByIdAndUpdate(id, {
            $pull: {
                likes: protectedRequest.user._id
            }
        });
        res.status(200).json({
            message: "Post unliked successfully",
            data: post
        });
    } else {
        const post = await Post.findByIdAndUpdate(id, {
            $push: {
                likes: protectedRequest.user._id
            }
        });
        res.status(200).json({
            message: "Post liked successfully",
            data: post
        });
    }
}

export const likePost = asyncHandler(likePostHandler);

const replyPostHandler = async (req: Request, res: Response, _: NextFunction) => {
    const protectedRequest = req as ProtectedRequest;
    const {id} = protectedRequest.params;
    const {text} = protectedRequest.body;

    if (!text) {
        res.status(400);
        throw new Error("Please provide text");
    }

    const isPostExist = await Post.exists({_id: id});

    if (!isPostExist) {
        res.status(404);
        throw new Error("Post not found");
    }

    const post = await Post.findByIdAndUpdate(id, {
        $push: {
            replies: {
                text,
                commentedBy: protectedRequest.user._id
            }
        }
    }, {new: true}).populate("replies.commentedBy", "username profilePic");

    res.status(201).json({
        message: "Reply added successfully",
        data: post
    });
}

export const replyPost = asyncHandler(replyPostHandler);