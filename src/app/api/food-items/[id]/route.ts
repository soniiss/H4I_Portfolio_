import { NextResponse } from "next/server";
import connectDB from "@/database/db";
import FoodItem from "@/database/models/FoodItem";

// Connect to MongoDB and update food item by id
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
    console.log("here");
    const toBeUpdated = await FoodItem.findByIdAndUpdate(id, allowedUpdates, {
      new: true, // Returns most up-to-date
      runValidators: true,
    });
    if (!toBeUpdated) {
      return NextResponse.json({ error: `No item with ID: ${id} found.` }, { status: 404 });
    }
    return NextResponse.json(toBeUpdated.toObject(), { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server failed to update item." }, { status: 500 });
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
    return NextResponse.json({ error: "Server failed to delete item." }, { status: 500 });
  }
}
