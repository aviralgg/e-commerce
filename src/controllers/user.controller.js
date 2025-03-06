import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, mobile, password } = req.body;
  if ([username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "username or password is missing");
  }
  if (!email && !mobile) {
    throw new ApiError(400, "Email or Mobile is required");
  }

  const query = [];
  if (email) query.push({ email });
  if (mobile) query.push({ mobile });
  const existedUser = await User.findOne({ $or: query });
  //   console.log(existedUser);

  if (existedUser) {
    throw new ApiError(409, "User with email or mobile already exists");
  }

  const user = await User.create({
    username,
    email,
    mobile,
    password,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});
