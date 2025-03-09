import { Router } from "express";
import {
  changeCurrentPassword,
  deleteUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyjwt, logoutUser);
router.route("/change-password").post(verifyjwt, changeCurrentPassword);
router.route("/current-user").get(verifyjwt, getCurrentUser);
router.route("/update-profile").patch(verifyjwt, updateUserProfile);
router.route("/delete").delete(verifyjwt, deleteUser);


export default router;
