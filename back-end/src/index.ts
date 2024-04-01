import express, {NextFunction, Request, Response} from "express";
import {connectDB} from "./db/connectDB";
import cookieParser from "cookie-parser";
import {authRouter, userRouter, postRouter} from "./routes";
import errorhandler from "errorhandler";
import notifier from "node-notifier";

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

app.all('*', (req, res, next) => {
    next("Route not found");
})

// error handling
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler({
    log: errorNotification,
  }))
} else {
    app.use(errorHandler)
}

function errorNotification (err: Error, str: string, req: Request) {
  const title = 'Error in ' + req.method + ' ' + req.url;

  notifier.notify({
    title,
    message: str
  })
}

function errorHandler(err: Error, req: Request, res: Response, _: NextFunction) {
  const title = 'Error in ' + req.method + ' ' + req.url;
  res.json({
    error: title,
    stack: err.stack,
    message: err.message
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});