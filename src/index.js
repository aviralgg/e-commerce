import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

import express from "express";
import { app } from "./app.js";

import connectDB from "./db/index.js";
connectDB()
  .then(() => {
    app.get('/', (req, res) => {
      res.status(200).send('Hello World!');
    });
    app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
      console.log("Hola");
    });
  })
  .catch((err) => {
    console.log("Mongo connection failed !!", err);
  });
