interface PreviousSearchesProps {
  searches: string[];
  onTermClicked: (term: string) => void;
}

export const PreviousSearches = ({
  searches,
  onTermClicked,
}: PreviousSearchesProps) => {
  return (
    <div className="previous-searches">
      <h2>Búsquedas previas</h2>
      <ul className="previous-searches-list">
        {searches.map((search) => {
          return (
            <li key={search} onClick={() => onTermClicked(search)}>
              {search}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
