import { beforeEach, describe, expect, it, vi } from "vitest";
import connectDB from "@/database/db";
import FoodItem from "@/database/models/FoodItem";
import { PUT } from "./route";

vi.mock("@/database/db", () => ({
  default: vi.fn(),
}));

vi.mock("@/database/models/FoodItem", () => ({
  default: {
    findByIdAndUpdate: vi.fn(),
  },
}));

const mockedConnectDB = vi.mocked(connectDB);
const mockedFindByIdAndUpdate = vi.mocked(FoodItem.findByIdAndUpdate);
const itemId = "507f1f77bcf86cd799439011";

function createPutRequest(body: unknown) {
  return new Request(`http://localhost/api/food-items/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function createContext(id = itemId) {
  return { params: Promise.resolve({ id }) };
}

describe("PUT /api/food-items/[id]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedConnectDB.mockResolvedValue(undefined);
  });

  it("returns the updated food item successfully", async () => {
    const updatedItem = {
      id: itemId,
      name: "Brown Rice",
      category: "Grains",
      quantity: 8,
      imageUrl: "",
    };
    mockedFindByIdAndUpdate.mockResolvedValue(updatedItem);

    const response = await PUT(createPutRequest({ name: "Brown Rice", quantity: 8 }), createContext());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(updatedItem);
    expect(mockedConnectDB).toHaveBeenCalledOnce();
    expect(mockedFindByIdAndUpdate).toHaveBeenCalledWith(
      itemId,
      { name: "Brown Rice", quantity: 8 },
      { new: true, runValidators: true },
    );
  });

  it("returns 404 when the food item ID does not exist", async () => {
    mockedFindByIdAndUpdate.mockResolvedValue(null);

    const response = await PUT(createPutRequest({ quantity: 0 }), createContext());

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: `No item with ID: ${itemId} found.` });
    expect(mockedFindByIdAndUpdate).toHaveBeenCalledWith(itemId, { quantity: 0 }, { new: true, runValidators: true });
  });

  it("rejects invalid fields before connecting to the database", async () => {
    const response = await PUT(createPutRequest({ quantity: "many" }), createContext());

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "Invalid food item fields" });
    expect(mockedConnectDB).not.toHaveBeenCalled();
    expect(mockedFindByIdAndUpdate).not.toHaveBeenCalled();
  });
});
