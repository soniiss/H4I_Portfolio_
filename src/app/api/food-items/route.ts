import { NextResponse } from "next/server";
// GET still needs this, we can delete it once GET is switched to MongoDB (#20)
import { mockFoodItems } from "@/data/mockFoodItems";
import connectDB from "@/database/db";
// this will show an error until the FoodItem model from #26 gets merged
// I called it FoodItemModel so it doesn't get mixed up with our FoodItem type
import FoodItemModel from "@/database/models/FoodItem";

export async function GET() {
  return NextResponse.json(mockFoodItems);
}

// checks the request and saves the new food item to MongoDB
export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.category || body.quantity === undefined) {
    return NextResponse.json({ error: "Missing required fields: name, category, quantity" }, { status: 400 });
  }

  try {
    // connectDB in db.ts is still a placeholder, so nothing actually saves until that's fixed
    await connectDB();
    // we don't make our own ID anymore, MongoDB gives each item an _id
    const created = await FoodItemModel.create({
      name: body.name,
      category: body.category,
      quantity: body.quantity,
      imageUrl: body.imageUrl ?? "",
    });
    const item = created.toObject();
    // the frontend still looks for id like the mock data had, so we copy _id over to id
    return NextResponse.json({ ...item, id: item._id.toString() }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create food item" }, { status: 500 });
  }
}
