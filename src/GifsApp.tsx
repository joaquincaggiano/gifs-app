import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de gifs"
        description="Descuibre y comparte el gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Buscar gifs" />

      {/* Búsquedas previas */}
      <PreviousSearches searches={["gatos", "perros", "animales"]} />

      {/* Gifs */}
      <GifList gifs={mockGifs} />
    </>
  );
};
