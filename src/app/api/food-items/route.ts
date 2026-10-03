import { NextResponse } from "next/server";
import { mockFoodItems } from "@/data/mockFoodItems";
import { mock } from "node:test";
import connectDB from "@/database/db";
import FoodItem from "@/database/models/FoodItem"; // placeholder path, adjust once issue #26 creates this model

// Find foodItemIDX and update its fields if found
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const foodItemIDX = mockFoodItems.findIndex((item) => item.id === id);
  // findIndex returns -1 if not found
  if (foodItemIDX === -1) {
    return NextResponse.json({ error: `No item with ID: ${id} found.` }, { status: 404 });
  }

  const updates = await request.json();

  // Update food item fields only if field was specified
  // (ommitting ID field)
  mockFoodItems[foodItemIDX] = {
    id: mockFoodItems[foodItemIDX].id,
    name: updates.name ? updates.name : mockFoodItems[foodItemIDX].name,
    category: updates.category ? updates.category : mockFoodItems[foodItemIDX].category,
    quantity: updates.quantity ? updates.quantity : mockFoodItems[foodItemIDX].quantity,
    imageUrl: updates.imageUrl ? updates.imageUrl : mockFoodItems[foodItemIDX].imageUrl,
  };
  return NextResponse.json(mockFoodItems[foodItemIDX], { status: 200 });
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
