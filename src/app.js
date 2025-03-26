import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/v2/users", userRouter);

import productRouter from "./routes/product.routes.js";

app.use("/api/v2/products", productRouter);

import cartRouter from "./routes/cart.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

app.use("/api/v2/cart", cartRouter);

app.use(errorHandler);

export { app };