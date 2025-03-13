import multer from "multer";
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

export const upload = multer({
  storage,
  // fileFilter,
  // limits: {
  //   fileSize: 1024 * 1024 * 5, // 5MB
  // },
}); 
