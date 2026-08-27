import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App.jsx";
import { add } from "./utils.js";

describe("add()", () => {
  it("adds two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("coerces string inputs", () => {
    expect(add("2", "3")).toBe(5);
  });
});

describe("App", () => {
  it("renders the title", () => {
    render(<App />);
    expect(screen.getByText("CI/CD Demo")).toBeInTheDocument();
  });

  it("shows the live sum of the two number inputs", () => {
    render(<App />);
    expect(screen.getByTestId("sum")).toHaveTextContent("= 5");
  });
});
