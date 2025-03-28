import multer from "multer";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
// import path from "path";
// import { ApiError } from "../utils/ApiError.js";

// copy from multer git repo Readme file and modify it
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // cb means callback
  },
});

// File type filter
// const fileFilter = (req, res, cb) => {
//   const allowedTypes = /jpeg|jpg|png|webp/;
//   const extName = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimeType = allowedTypes.test(file.mimetype);
//   if (extName && mimeType) {
//     cb(null, true);
//   } else {
//     cb(
//       new ApiError(400, "Only image files are allowed (jpg, jpeg, png, webp)")
//     );
//   }
// };

const upload = multer({
  storage,
  // fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024 * 5, // 5MB
  // },
});

const validateImageCount = asyncHandler(async (req, res, next) => {
  if (!req.files || req.files.length < 1 || req.files.length > 4) {
    throw new ApiError(400, "You must upload between 1 and 4 images");
  }
  next();
});

export { upload, validateImageCount };
