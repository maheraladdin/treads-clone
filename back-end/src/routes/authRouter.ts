import express from "express";
import {signUp, login, logout} from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login)
authRouter.post("/logout", logout);

export default authRouter;