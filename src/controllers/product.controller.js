
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

const deleteImages = async(imageUrls)=>{
  try {
    for(const imageUrl of imageUrls){
      const res = await deleteFromCloudinary(imageUrl);
      if(!res){
        throw new ApiError(400, "error in deletion function");
      }
    }
  } catch (error) {
    throw new ApiError(400, "Error while deleting images from cloudinary");
  }
}

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

  const existedProduct = await Product.findOne({ name });
  if (existedProduct) {
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

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products) {
    throw new ApiError(404, "Products not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, products, "All products fetched successfully"));
});

const getOneProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  res.status(200).json(new ApiResponse(200, product, "Product found"));
});

const updateProductDetails = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (name) {
    const existedProduct = await Product.findOne({
      name: name,
      _id: { $ne: req.params.id },
    });
    if (existedProduct) {
      throw new ApiError(
        400,
        "Product with same name but different id already exists"
      );
    }
  }
  const price =
    req.body.price !== undefined ? Number(req.body.price) : undefined;
  const stock =
    req.body.stock !== undefined ? Number(req.body.stock) : undefined;

  if (Object.keys(req.body).length === 0) {
    throw new ApiError(400, "At least one field is required");
  }

  if (
    (price !== undefined && (!Number.isFinite(price) || price <= 0)) ||
    (stock !== undefined && (!Number.isFinite(stock) || stock <= 0))
  ) {
    throw new ApiError(400, "Price and Stock must be a number greater than 0");
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedProduct) {
    throw new ApiError(400, "Product not updated successfully");
  }
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProduct,
        "Product details updated successfully"
      )
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(!product){
    throw new ApiError(404, "Product not found");
  }
  await deleteImages(product.images);
  await Product.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});

export {
  createProduct,
  getAllProducts,
  getOneProduct,
  updateProductDetails,
  deleteProduct,
};
