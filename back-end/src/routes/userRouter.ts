import express from "express";
import {follow, getUserProfile, updatePassword, updateProfile} from "../controllers/userController";
import protectRoute from "../middlewares/protectRoute";

const userRouter = express.Router();

userRouter.get("/profile/:username", getUserProfile);

userRouter.use(protectRoute);
userRouter.patch("/follow/:id", follow);
userRouter.put("/update-profile", updateProfile);
userRouter.patch("/update-password", updatePassword);

export default userRouter;