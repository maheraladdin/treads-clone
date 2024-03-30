import {Request, Response} from "express";

export const signUp = (req: Request, res: Response) => {
    res.send("Sign up route");
}