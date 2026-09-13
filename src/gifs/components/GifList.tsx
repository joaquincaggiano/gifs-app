import type { Gif } from "../../mock-data/gifs.mock";

interface GifListProps {
  gifs: Gif[];
}

export const GifList = ({ gifs }: GifListProps) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => {
        return (
          <div key={gif.id} className="gif-card">
            <img src={gif.url} alt={gif.title} />
            <h3>{gif.title}</h3>
            <p>
              {gif.width}x{gif.height} (1.5mb)
            </p>
          </div>
        );
      })}
    </div>
  );
};
