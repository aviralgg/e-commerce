import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, stock } = req.body;
  if (![name, price, category, description, stock].every(Boolean)) {
    throw new ApiError(400, "All fields are required");
  }
  if (isNaN(price) || price <= 0) {
    throw new ApiError(400, "Price must be positive");
  }
  if (!Number.isInteger(stock) || stock < 0) {
    throw new ApiError(400, "Stock must be a non-negative integer");
  }
  const existedProduct = await Product.findOne({ name });
  if (existedProduct) {
    throw new ApiError(400, "Product already exists");
  }

  const product = await Product.create({
    name,
    price,
    description,
    category,
    stock,
  });
  res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});
