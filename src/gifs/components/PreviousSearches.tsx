interface PreviousSearchesProps {
  searches: string[];
}

export const PreviousSearches = ({ searches }: PreviousSearchesProps) => {
  return (
    <div className="previous-searches">
      <h2>Búsquedas previas</h2>
      <ul className="previous-searches-list">
        {searches.map((search) => {
          return <li key={search}>{search}</li>;
        })}
      </ul>
    </div>
  );
};
