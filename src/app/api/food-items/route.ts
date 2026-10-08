import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import FoodItem from "@/database/models/FoodItem";

export async function GET() {
  try {
    await connectDB();
    const foodItems = await FoodItem.find();

    return NextResponse.json(foodItems);
  } catch (error) {
    console.error("Failed to fetch food items:", error);

    return NextResponse.json({ error: "Failed to fetch food items" }, { status: 500 });
  }
}

// checks the request and saves the new food item to MongoDB
export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.category || body.quantity === undefined) {
    return NextResponse.json({ error: "Missing required fields: name, category, quantity" }, { status: 400 });
  }

  try {
    await connectDB();
    // we don't make our own ID anymore, MongoDB gives each item an _id
    const created = await FoodItem.create({
      name: body.name,
      category: body.category,
      quantity: body.quantity,
      imageUrl: body.imageUrl ?? "",
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("Failed to create food item:", error);

    return NextResponse.json({ error: "Failed to create food item" }, { status: 500 });
  }
}
