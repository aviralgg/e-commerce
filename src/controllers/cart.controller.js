import { asyncHandler } from "../utils/asyncHandler.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const deleteFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  // Find the product in the cart
  const productIndex = cart.products.findIndex(
    (p) => p.product.toString() === productId.toString()
  );

  if (productIndex === -1) {
    throw new ApiError(404, "Product not found in cart");
  }

  // Get product details for price update
  const prdt = await Product.findById(productId);
  if (!prdt) {
    throw new ApiError(404, "Product not found in database");
  }
  // Reduce total price
  const removedProduct = cart.products[productIndex];
  cart.TotalPrice -= removedProduct.quantity * prdt.price;

  // Remove product from cart
  cart.products.splice(productIndex, 1);

  // Save the updated cart
  await cart.save();

  res.status(200).json(new ApiResponse(200, cart, "Product removed from cart"));
});

export { deleteFromCart };
