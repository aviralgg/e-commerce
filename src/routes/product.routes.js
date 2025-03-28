import { Router } from "express";
import {
  addToCart,
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProductDetails,
} from "../controllers/product.controller.js";
import {
  upload,
  validateImageCount,
} from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/create-product")
  .post(upload.array("images", 4), validateImageCount, createProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/getOneProduct/:id").get(getOneProduct);
router.route("/updateProductDetails/:id").patch(updateProductDetails);
router.route("/deleteProduct/:id").delete(deleteProduct);
router.route("/addToCart/:name").post(verifyjwt, addToCart);

export default router;
