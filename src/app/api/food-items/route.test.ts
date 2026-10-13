// @vitest-environment node
// runs in node instead of the fake browser since this is server code that loads mongoose
import { describe, expect, it } from "vitest";
import { POST } from "./route";

// builds a fake POST request so we can call the route directly without running the server
function makeRequest(body: object) {
  return new Request("http://localhost/api/food-items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/food-items", () => {
  // the route checks the fields before it connects to MongoDB, so these never touch the database
  it("returns 400 when the name is missing", async () => {
    const response = await POST(makeRequest({ category: "Produce", quantity: 5 }));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Missing required fields: name, category, quantity" });
  });

  it("returns 400 when the quantity is missing", async () => {
    const response = await POST(makeRequest({ name: "Apple", category: "Produce" }));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Missing required fields: name, category, quantity" });
  });
});
