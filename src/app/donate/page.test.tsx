import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import DonatePage from "./page";

describe("DonatePage", () => {
  it("shows the donate page and preset amounts", () => {
    render(<DonatePage />);

    expect(screen.getByRole("heading", { name: "Donate" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "$5", exact: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "$10", exact: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "$25", exact: true })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "$50", exact: true })).toBeInTheDocument();
  });

  it("marks the selected preset amount", async () => {
    const user = userEvent.setup();
    render(<DonatePage />);

    const tenDollarButton = screen.getByRole("button", { name: "$10", exact: true });
    await user.click(tenDollarButton);

    expect(tenDollarButton).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "$5", exact: true })).toHaveAttribute("aria-pressed", "false");
  });

  it("confirms a preset donation", async () => {
    const user = userEvent.setup();
    render(<DonatePage />);

    await user.click(screen.getByRole("button", { name: "$10", exact: true }));
    await user.click(screen.getByRole("button", { name: "Donate Now" }));

    expect(screen.getByText("Thank you for your donation of $10!")).toBeInTheDocument();
  });
});
