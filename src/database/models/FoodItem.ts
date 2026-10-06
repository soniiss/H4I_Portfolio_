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
        item.id = item._id.toString();
        delete item._id;
        delete item.__v;
        return item;
      },
    },
  },
);

export default mongoose.models.FoodItem || mongoose.model("FoodItem", FoodItemSchema);
