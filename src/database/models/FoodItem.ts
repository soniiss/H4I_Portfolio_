import mongoose, { Schema } from "mongoose";

const FoodItemSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: "" },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_document, item) => {
        const { _id, __v, ...foodItem } = item;

        return {
          ...foodItem,
          id: _id.toString(),
        };
      },
    },
  },
);

export default mongoose.models.FoodItem || mongoose.model("FoodItem", FoodItemSchema);
