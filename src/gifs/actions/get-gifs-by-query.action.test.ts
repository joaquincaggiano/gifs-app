import { describe, test, expect, beforeEach, vi } from "vitest";
import { getGifsByQueryAction } from "./get-gifs-by-query.action";
import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";
import { giphyDataMock } from "../../../tests/mocks/giphy.data";

describe("getGifsByQueryAction", () => {
  const mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock.reset();
  });

  test("should return a list of gifs", async () => {
    mock.onGet("/search").reply(200, giphyDataMock);

    const gifs = await getGifsByQueryAction("Naruto");

    expect(gifs.length).toBe(10);

    gifs.forEach((gif) => {
      expect(gif).toEqual({
        id: expect.any(String),
        title: expect.any(String),
        url: expect.any(String),
        width: expect.any(Number),
        height: expect.any(Number),
      });
    });
  });

  test("should return an empty list of gifs if query is not provided", async () => {
    mock.onGet("/search").reply(200, { data: [] });

    const gifs = await getGifsByQueryAction("");

    expect(gifs.length).toBe(0);
  });

  test("should handle error when the API returns an error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    mock
      .onGet("/search")
      .reply(500, { data: { message: "Internal server error" } });

    const gifs = await getGifsByQueryAction("Naruto");

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());
  });
});
