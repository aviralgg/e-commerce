import { Router } from "express";
import { deleteFromCart } from "../controllers/cart.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/deleteFromCart/:id").delete(verifyjwt, deleteFromCart);

export default router;
