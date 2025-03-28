import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
    TotalPrice: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
