import { NextResponse } from "next/server";
// Delete once DELETE TODO is implemented
import { mockFoodItems } from "@/data/mockFoodItems";
import { mock } from "node:test";
import connectDB from "@/database/db";
import FoodItem from "@/database/models/FoodItem"; // placeholder path, adjust once issue #26 creates this model

// Find foodItemIDX and update its fields if found
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // The provided updates destructured
  const { name, category, quantity, imageUrl } = await request.json();

  const allowedUpdates = {
    // Checks if the updates are defined individually
    // If so, adds to allowedUpdates object
    // Ensures no empty fields are passed later to FoodItem
    ...(name !== undefined && { name }),
    ...(category !== undefined && { category }),
    ...(quantity !== undefined && { quantity }),
    ...(imageUrl !== undefined && { imageUrl }),
  };

  try {
    await connectDB();
    const toBeUpdated = await FoodItem.findByIdAndUpdate(id, allowedUpdates, {
      new: true, // Returns most up-to-date
      runValidators: true,
    });
    if (!toBeUpdated) {
      return NextResponse.json({ error: `No item with ID: ${id} found.` }, { status: 404 });
    }
    return NextResponse.json(toBeUpdated.toObject(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Item not updated." }, { status: 500 });
  }
}

// Connect to MongoDB and delete the matching food item
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await connectDB();

    const deletedItem = await FoodItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ error: `No item with ID: ${id} found.` }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item." }, { status: 500 });
  }
}
