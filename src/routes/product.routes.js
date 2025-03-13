import { Router } from "express";
import { createProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-product").post(upload.array("images", 4), createProduct);

export default router;
