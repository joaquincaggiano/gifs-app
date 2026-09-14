import { useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQueryAction } from "../actions/get-gifs-by-query.action";

export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleTermClicked = async (term: string) => {
    const gifsSearched = await getGifsByQueryAction(term);
    setGifs(gifsSearched);
  };

  const handleSearch = async (query: string) => {
    let newQuery = query.trim().toLowerCase();

    if (newQuery.length === 0) return;

    if (previousTerms.includes(newQuery)) return;

    setPreviousTerms((prev) => [newQuery, ...prev].slice(0, 8));

    const gifsSearched = await getGifsByQueryAction(newQuery);

    setGifs(gifsSearched);
  };

  return {
    previousTerms,
    gifs,
    handleSearch,
    handleTermClicked,
  };
};
