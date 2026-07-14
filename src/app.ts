import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { postRoutes } from "./modules/post/post.routes";
import { commentRoutes } from "./modules/comment/comment.routes";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { subscriptionRoutes } from "./modules/subscription/subscription.route";
import { premiumRoutes } from "./modules/premium/premium.routes";



const app: Application = express();

app.use(cors({
    origin: config.app_url,
    credentials: true
}));

app.use("/api/subscription/webhook", express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

// user routes
app.use("/api/users", userRoutes);

// auth routes
app.use("/api/auth", authRoutes);

// post routes
app.use("/api/posts", postRoutes);

// comment routes
app.use("/api/comments", commentRoutes);

// subscription routes
app.use("/api/subscription", subscriptionRoutes);

// premium post routes
app.use("/api/premium", premiumRoutes);

// not found route
app.use(notFound);

// global error handler route
app.use(globalErrorHandler);


export default app;