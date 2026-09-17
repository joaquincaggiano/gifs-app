import { describe, test, expect } from "vitest";
import { getGifsByQueryAction } from "./get-gifs-by-query.action";
import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";
import { giphyDataMock } from "../../../tests/mocks/giphy.data";

describe("getGifsByQueryAction", () => {
  const mock = new AxiosMockAdapter(giphyApi);

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
});
