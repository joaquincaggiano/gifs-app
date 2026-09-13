import { mockGifs } from "./mock-data/gifs.mock";

export const GifsApp = () => {
  return (
    <>
      {/* Header */}
      <div className="content-center">
        <h1>Buscador de gifs</h1>
        <p>Descuibre y comparte el gif perfecto</p>
      </div>

      {/* Search */}
      <div className="search-container">
        <input type="text" placeholder="Buscar gifs" />
        <button>Buscar</button>
      </div>

      {/* Búsquedas previas */}
      <div className="previous-searches">
        <h2>Búsquedas previas</h2>
        <ul className="previous-searches-list">
          <li>Gifs de gatos</li>
          <li>Gifs de perros</li>
          <li>Gifs de animales</li>
        </ul>
      </div>

      {/* Gifs */}
      <div className="gifs-container">
        {mockGifs.map((gif) => {
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
    </>
  );
};
