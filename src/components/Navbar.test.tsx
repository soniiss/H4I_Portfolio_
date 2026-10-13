import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

vi.mock("@/components/Logo", () => ({
  default: () => createElement("span", { "data-testid": "pantry-logo" }),
}));

const mockedUsePathname = vi.mocked(usePathname);

describe("Navbar", () => {
  beforeEach(() => {
    mockedUsePathname.mockReturnValue("/");
  });

  it("renders the pantry brand and all five page links", () => {
    render(<Navbar />);

    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cal Poly SLO Food Pantry" })).toHaveAttribute("href", "/");
    expect(screen.getByTestId("pantry-logo")).toBeInTheDocument();

    const expectedLinks = [
      ["Home", "/"],
      ["About", "/about"],
      ["Inventory", "/inventory"],
      ["Donate", "/donate"],
      ["Contact", "/contact"],
    ];

    for (const [name, href] of expectedLinks) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  it("marks only the current page link as active", () => {
    mockedUsePathname.mockReturnValue("/donate");

    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Donate" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
    expect(screen.getAllByRole("link").filter((link) => link.getAttribute("aria-current") === "page")).toHaveLength(1);
  });

  it("keeps a parent link active on a nested route without activating Home", () => {
    mockedUsePathname.mockReturnValue("/inventory/507f1f77bcf86cd799439011");

    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Inventory" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });
});
