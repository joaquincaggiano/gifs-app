import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";
import { render, screen } from "@testing-library/react";

describe("CustomHeader", () => {
  const title = "Test Title";

  test("should render the title correctly", () => {
    render(<CustomHeader title={title} />);

    expect(screen.getByText(title)).toBeDefined();
  });

  test("should render the description when is provided", () => {
    const description = "Test Description";
    render(<CustomHeader title={title} description={description} />);

    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole("paragraph")).toBeDefined();
    expect(screen.getByRole("paragraph").innerHTML).toBe(description);
  });

  test("should not render the description when is not provided", () => {
    const { container } = render(<CustomHeader title={title} />);

    const divElement = container.querySelector(".content-center");
    const paragraphElement = divElement?.querySelector("p");
    expect(paragraphElement).toBeNull();
  });
});
