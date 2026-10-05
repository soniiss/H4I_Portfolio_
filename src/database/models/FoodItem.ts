import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: false,
    default: "",
  },
});

const FoodItem = mongoose.models.FoodItem || mongoose.model("FoodItem", FoodItemSchema);

export default FoodItem;
