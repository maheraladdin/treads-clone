import express from "express";
import {signUp, login} from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login)

export default authRouter;