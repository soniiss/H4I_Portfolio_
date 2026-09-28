import { NextResponse } from "next/server";
import { mockFoodItems } from "@/data/mockFoodItems";
import { mock } from "node:test";

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
