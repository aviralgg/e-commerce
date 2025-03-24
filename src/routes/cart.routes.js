import { Router } from "express";
import { deleteFromCart, getCart } from "../controllers/cart.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/deleteFromCart/:id").delete(verifyjwt, deleteFromCart);
router.route("/getCart").get(verifyjwt, getCart);

export default router;
