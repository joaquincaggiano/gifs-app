import { useState } from "react";
import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const [previousTerms, setPreviousTerms] = useState<string[]>(["Goku"]);

  const handleTermClicked = (term: string) => {
    console.log(term);
  };

  const handleSearch = (query: string) => {
    console.log(query);
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
      <GifList gifs={mockGifs} />
    </>
  );
};
