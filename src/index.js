import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import { app } from "./app.js";

import connectDB from "./db/index.js";
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo connection failed !!", err);
  });
