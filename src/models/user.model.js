import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({},{timestamps: true});

export const User = mongoose.model("User", userSchema);