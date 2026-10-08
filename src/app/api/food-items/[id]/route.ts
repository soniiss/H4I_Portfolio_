import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/database/db";
import FoodItem from "@/database/models/FoodItem";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: `Invalid food item ID: ${id}` }, { status: 400 });
  }

  try {
    const updates = await request.json();
    if (
      !updates ||
      typeof updates !== "object" ||
      (updates.name !== undefined && typeof updates.name !== "string") ||
      (updates.category !== undefined && typeof updates.category !== "string") ||
      (updates.quantity !== undefined &&
        (typeof updates.quantity !== "number" || !Number.isFinite(updates.quantity))) ||
      (updates.imageUrl !== undefined && typeof updates.imageUrl !== "string")
    ) {
      return NextResponse.json({ error: "Invalid food item fields" }, { status: 400 });
    }

    const fields = ["name", "category", "quantity", "imageUrl"] as const;
    const changes = Object.fromEntries(
      fields.filter((field) => field in updates).map((field) => [field, updates[field]]),
    );

    await connectDB();
    const foodItem = await FoodItem.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
    if (!foodItem) {
      return NextResponse.json({ error: `No item with ID: ${id} found.` }, { status: 404 });
    }

    return NextResponse.json(foodItem);
  } catch (error) {
    console.error("Failed to update food item:", error);
    return NextResponse.json({ error: "Failed to update food item" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: `Invalid food item ID: ${id}` }, { status: 400 });
  }

  try {
    await connectDB();
    const foodItem = await FoodItem.findByIdAndDelete(id);
    if (!foodItem) {
      return NextResponse.json({ error: `No item with ID: ${id} found.` }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete food item:", error);
    return NextResponse.json({ error: "Failed to delete food item" }, { status: 500 });
  }
}
