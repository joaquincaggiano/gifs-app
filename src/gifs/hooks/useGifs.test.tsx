import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useGifs } from "./useGifs";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs).toEqual([]);
    expect(result.current.gifs.length).toBe(0);

    expect(result.current.previousTerms).toEqual([]);
    expect(result.current.previousTerms.length).toBe(0);

    expect(result.current.handleTermClicked).toBeDefined();
    expect(result.current.handleSearch).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("Naruto");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("Naruto");
    });

    expect(result.current.gifs.length).toBe(10);
  });
});
