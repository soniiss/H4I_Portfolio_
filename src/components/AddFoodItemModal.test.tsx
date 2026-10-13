import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import AddFoodItemModal from "./AddFoodItemModal";

// puts the real fetch back after each test since we swap it out for a fake one
afterEach(() => {
  vi.unstubAllGlobals();
});

describe("AddFoodItemModal", () => {
  it("shows an error and doesn't send a request when the form is empty", async () => {
    // fake fetch that just remembers if it got called
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<AddFoodItemModal />);

    await user.click(screen.getByRole("button", { name: "Add food item" }));
    await user.click(screen.getByRole("button", { name: "Add Item" }));

    expect(screen.getByText("Please fill in all required fields.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the item to the POST route and shows a success message", async () => {
    // fake fetch that acts like the server saved the item
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: "1", name: "Apple", category: "Produce", quantity: 5, imageUrl: "" }), {
        status: 201,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<AddFoodItemModal />);

    await user.click(screen.getByRole("button", { name: "Add food item" }));
    await user.type(screen.getByLabelText("Name"), "Apple");
    await user.type(screen.getByLabelText("Category"), "Produce");
    await user.type(screen.getByLabelText("Quantity"), "5");
    await user.click(screen.getByRole("button", { name: "Add Item" }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/food-items");
    expect(options.method).toBe("POST");
    // quantity should be sent as a number, not the "5" string from the input
    expect(JSON.parse(options.body)).toEqual({ name: "Apple", category: "Produce", quantity: 5, imageUrl: "" });

    expect(await screen.findByText("Apple was added!")).toBeInTheDocument();
  });
});
