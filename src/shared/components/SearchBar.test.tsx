import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  test("should render searchbar component", () => {
    const { container } = render(<SearchBar onSearch={() => {}} />);

    expect(container).toMatchSnapshot();
  });

  test("should call onSearch with the correct value after 600ms", async () => {
    const searchValue = "naruto";
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: searchValue } });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalled();
      expect(onSearch).toHaveBeenCalledWith(searchValue);
    });
  });

  test("should call onSearch only once with the last value", async () => {
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "t" } });
    fireEvent.change(input, { target: { value: "te" } });
    fireEvent.change(input, { target: { value: "tes" } });
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith("test");
      expect(onSearch).toHaveBeenCalledTimes(1);
    });
  });

  test("should call onSearch when button is clicked", async () => {
    const searchValue = "naruto";
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: searchValue } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(searchValue);
  });

  test("should input has the correct placeholder value", () => {
    const placeholder = "Buscar test";
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} placeholder={placeholder} />);

    expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
  });
});
