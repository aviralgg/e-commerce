import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProductDetails } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-product").post(upload.array("images", 4), createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getOneProduct/:id").get(getOneProduct);
router.route("/updateProductDetails/:id").patch(updateProductDetails);
router.route("/deleteProduct/:id").delete(deleteProduct);

export default router;
