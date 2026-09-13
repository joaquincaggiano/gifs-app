import type { GiphyResponse } from "../interfaces/giphy-response.interface";
import type { Gif } from "../interfaces/gif.interface";
import { giphyApi } from "../api/giphy.api";

export const getGifsByQueryAction = async (query: string): Promise<Gif[]> => {
  const response = await giphyApi.get<GiphyResponse>("/search", {
    params: {
      q: query,
      limit: 10,
    },
  });

  const gifs = response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));

  return gifs;
};
