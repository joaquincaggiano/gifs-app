import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";
import { getGifsByQueryAction } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleSearch = async (query: string) => {
    let newQuery = query.trim().toLowerCase();

    if (newQuery.length === 0) return;

    if (previousTerms.includes(newQuery)) return;

    setPreviousTerms((prev) => [newQuery, ...prev].slice(0, 8));

    const gifsSearched = await getGifsByQueryAction(newQuery);

    setGifs(gifsSearched);
  };

  const handleTermClicked = async (term: string) => {
    const gifsSearched = await getGifsByQueryAction(term);
    setGifs(gifsSearched);
  };

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de gifs"
        description="Descuibre y comparte el gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Buscar gifs" onSearch={handleSearch} />

      {/* Búsquedas previas */}
      <PreviousSearches
        searches={previousTerms}
        onTermClicked={handleTermClicked}
      />

      {/* Gifs */}
      <GifList gifs={gifs} />
    </>
  );
};
