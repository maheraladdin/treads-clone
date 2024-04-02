import express from "express";
import {createPost, deletePost, getFeed, getPost, likePost, replyPost} from "../controllers/postController";
import ProtectRoute from "../middlewares/protectRoute";

const postRouter = express.Router();

postRouter.get("/feed",ProtectRoute,  getFeed);
postRouter.get("/:id", getPost);
postRouter.use(ProtectRoute);
postRouter.post("/", createPost);
postRouter.delete("/:id", deletePost);
postRouter.patch("/like/:id", likePost);
postRouter.patch("/reply/:id", replyPost);

export default postRouter;