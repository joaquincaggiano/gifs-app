import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";
import { gifsDataMock } from "../../../tests/mocks/gifs.data";

describe("useGifs", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

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

    vi.spyOn(gifActions, "getGifsByQueryAction").mockResolvedValue(
      gifsDataMock,
    );

    await act(async () => {
      await result.current.handleSearch("Naruto");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGifsByQueryAction").mockResolvedValue(
      gifsDataMock,
    );

    await act(async () => {
      await result.current.handleTermClicked("Naruto");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs from cache", async () => {
    const { result } = renderHook(() => useGifs());

    const getGifsSpy = vi
      .spyOn(gifActions, "getGifsByQueryAction")
      .mockResolvedValue(gifsDataMock);

    await act(async () => {
      await result.current.handleTermClicked("Naruto");
    });

    expect(result.current.gifs.length).toBe(10);

    // Rompemos la conexión para demostrar que la segunda llamada retorna los valores del cache
    getGifsSpy.mockRejectedValue(new Error("Error"));

    await act(async () => {
      await result.current.handleTermClicked("Naruto");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 8 previous terms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGifsByQueryAction").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("Naruto");
      await result.current.handleSearch("Naruto2");
      await result.current.handleSearch("Naruto3");
      await result.current.handleSearch("Naruto4");
      await result.current.handleSearch("Naruto5");
      await result.current.handleSearch("Naruto6");
      await result.current.handleSearch("Naruto7");
      await result.current.handleSearch("Naruto8");
      await result.current.handleSearch("Naruto9");
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toStrictEqual([
      "naruto9",
      "naruto8",
      "naruto7",
      "naruto6",
      "naruto5",
      "naruto4",
      "naruto3",
      "naruto2",
    ]);
  });
});
