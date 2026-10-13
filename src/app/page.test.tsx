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

  it("shows three feature cards", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(3);
    expect(screen.getByRole("heading", { name: /browse food/i })).toBeInTheDocument();
  });

  it("links the Browse Food card to the inventory page", () => {
    render(<Home />);

    const card = screen.getByRole("heading", { name: /browse food/i }).closest("a");
    expect(card).toHaveAttribute("href", "/inventory");
  });

  it("links every feature card to a real site page", () => {
    render(<Home />);

    const sitePages = ["/inventory", "/about", "/contact", "/donate"];
    screen.getAllByRole("heading", { level: 2 }).forEach((heading) => {
      expect(sitePages).toContain(heading.closest("a")?.getAttribute("href"));
    });
  });

  it("does not render its own navbar", () => {
    render(<Home />);

    expect(screen.queryByRole("navigation")).toBeNull();
  });
});
