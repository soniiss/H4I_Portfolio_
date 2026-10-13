import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("shows the pantry title and mission description", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Cal Poly SLO");
    expect(heading).toHaveTextContent("Food Pantry");
    expect(screen.getByText(/no one should have to choose between college and food/i)).toBeInTheDocument();
  });

  it("links the hero buttons to the inventory and contact pages", () => {
    render(<Home />);

    expect(screen.getByRole("link", { name: "View Inventory" })).toHaveAttribute("href", "/inventory");
    expect(screen.getByRole("link", { name: "Support" })).toHaveAttribute("href", "/contact");
  });

  it("shows the existing pantry photo with alt text in the hero", () => {
    render(<Home />);

    const image = screen.getByAltText("Food pantry volunteers");
    expect(decodeURIComponent(image.getAttribute("src") ?? "")).toContain("/food-pantry.jpg");
  });

  it("shows the three feature cards", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Browse Food" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Support Our Community" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Donate" })).toBeInTheDocument();
  });

  it.each([
    ["Browse Food", "/inventory"],
    ["Support Our Community", "/contact"],
    ["Donate", "/donate"],
  ])("makes the %s card a link to %s", (title, href) => {
    render(<Home />);

    const card = screen.getByRole("heading", { name: title }).closest("a");
    expect(card).toHaveAttribute("href", href);
  });

  it("does not render its own navbar", () => {
    render(<Home />);

    expect(screen.queryByRole("navigation")).toBeNull();
  });
});
