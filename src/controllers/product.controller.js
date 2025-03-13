import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category } = req.body;
  const price = Number(req.body.price);
  const stock = Number(req.body.stock);
  if (!name || !description || !category || !price || !stock) {
    throw new ApiError(400, "All fields are required");
  }
  if (isNaN(price) || isNaN(stock) || price <= 0 || stock <= 0) {
    throw new ApiError(
      400,
      "Price and Stock must be a number and greater than 0"
    );
  }
  if (!req.files || req.files.length < 1 || req.files.length > 4) {
    throw new ApiError(400, "Upload 1 to 4 images only");
  }
  // console.log(req.files);

  const existedProduct = await Product.findOne({name});
  if(existedProduct){
    throw new ApiError(400, "Product name already exists");
  }
  
  const uploadedImages = [];
  for (let i = 0; i < req.files.length; i++) {
    const imageLocalPath = req.files[i].path;
    const response = await uploadOnCloudinary(imageLocalPath);
    if (!response) {
      throw new ApiError(500, "Image upload failed");
    }
    uploadedImages.push(response.url);
  }
  if (uploadedImages.length !== req.files.length) {
    throw new ApiError(500, "Image upload failed due to length mismatch");
  }
  const product = await Product.create({
    name,
    price,
    description,
    category,
    stock,
    images: uploadedImages,
  });
  res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

export { createProduct };
