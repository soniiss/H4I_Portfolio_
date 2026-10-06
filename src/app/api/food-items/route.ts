import { NextResponse } from "next/server";
import { mockFoodItems } from "@/data/mockFoodItems";
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

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.category || body.quantity === undefined) {
    return NextResponse.json({ error: "Missing required fields: name, category, quantity" }, { status: 400 });
  }

  const newItem = {
    id: crypto.randomUUID(),
    name: body.name,
    category: body.category,
    quantity: body.quantity,
    imageUrl: body.imageUrl ?? "",
  };

  mockFoodItems.push(newItem);

  return NextResponse.json(newItem, { status: 201 });
}
