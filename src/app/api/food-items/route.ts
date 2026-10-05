import { NextResponse } from "next/server";
import { mockFoodItems } from "@/data/mockFoodItems";

export async function GET() {
  return NextResponse.json(mockFoodItems);
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
