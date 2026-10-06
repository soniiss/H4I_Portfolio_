import { NextResponse } from "next/server";
// Delete once DELETE TODO is implemented
import { mockFoodItems } from "@/data/mockFoodItems";
import connectDB from "@/database/db";
// Won't work until FoodItem model is implemented (#26)
import FoodItem from "@/database/models/FoodItem";

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

// TODO: Update DELETE route (#23)
// Find foodItemIDX and splice from mockFoodItems if found
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const foodItemIDX = mockFoodItems.findIndex((item) => item.id === id);
  if (foodItemIDX === -1) {
    return NextResponse.json({ error: `No item with ID: ${id} found.` }, { status: 404 });
  }

  mockFoodItems.splice(foodItemIDX, 1);
  // 204 is successful delete
  return NextResponse.json({ status: 204 });
}
