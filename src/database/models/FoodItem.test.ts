// @vitest-environment node
import { describe, expect, it } from "vitest";
import FoodItem from "./FoodItem";

// validateSync checks an item against the schema without saving it, so nothing touches the database
describe("FoodItem schema", () => {
  it("rejects a negative quantity", () => {
    const item = new FoodItem({ name: "Apple", category: "Produce", quantity: -1 });
    const error = item.validateSync();

    expect(error?.errors.quantity).toBeDefined();
  });

  it("accepts a quantity of 0", () => {
    const item = new FoodItem({ name: "Canned Corn", category: "Canned Goods", quantity: 0 });
    const error = item.validateSync();

    expect(error).toBeUndefined();
  });

  it("requires a name", () => {
    const item = new FoodItem({ category: "Produce", quantity: 5 });
    const error = item.validateSync();

    expect(error?.errors.name).toBeDefined();
  });
});
