import axios from "axios";
import type { GiphyResponse } from "../interfaces/giphy-response.interface";
import type { Gif } from "../interfaces/gif.interface";

export const getGifsByQueryAction = async (query: string): Promise<Gif[]> => {
  const response = await axios.get<GiphyResponse>(
    "https://api.giphy.com/v1/gifs/search",
    {
      params: {
        api_key: "0IwuaxHg7EhIzwXkLWA14Bd3Cy9KY4tY",
        q: query,
        limit: 10,
        lang: "en",
      },
    },
  );

  const gifs = response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));

  return gifs;
};
