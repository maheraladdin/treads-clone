import express from "express";
import {createPost} from "../controllers/postController";
import ProtectRoute from "../middlewares/protectRoute";

const postRouter = express.Router();

postRouter.use(ProtectRoute);
postRouter.post("/create", createPost);

export default postRouter;