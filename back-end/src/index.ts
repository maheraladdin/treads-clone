import express from "express";
import {connectDB} from "./db/connectDB";
import cookieParser from "cookie-parser";
import {authRouter, userRouter, postRouter} from "./routes";


// connect to the database
(async () => await connectDB())();

// initialize express
const app = express();

const PORT = process.env.PORT || 3000;

// middlewares

// allow express to parse json
app.use(express.json());

// allow express to parse urlencoded data
app.use(express.urlencoded({ extended: true }));

// allow express to parse cookies
app.use(cookieParser());

// routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});