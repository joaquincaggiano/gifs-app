import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQueryAction } from "../actions/get-gifs-by-query.action";

export const useGifs = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const gifsCache = useRef<Record<string, Gif[]>>({});

  const handleTermClicked = async (term: string) => {
    if (gifsCache.current[term]) {
      setGifs(gifsCache.current[term]);
      return;
    }

    const gifsSearched = await getGifsByQueryAction(term);
    setGifs(gifsSearched);
    gifsCache.current[term] = gifsSearched;
  };

  const handleSearch = async (query: string) => {
    let newQuery = query.trim().toLowerCase();

    if (newQuery.length === 0) return;

    if (previousTerms.includes(newQuery)) return;

    setPreviousTerms((prev) => [newQuery, ...prev].slice(0, 8));

    const gifsSearched = await getGifsByQueryAction(newQuery);

    setGifs(gifsSearched);
    gifsCache.current[newQuery] = gifsSearched;
  };

  return {
    previousTerms,
    gifs,
    handleSearch,
    handleTermClicked,
  };
};
