import { useEffect, useState, type KeyboardEvent } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

export const SearchBar = ({
  placeholder = "Buscar",
  onSearch,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) return;

    const timeout = setTimeout(() => {
      onSearch(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, onSearch]);

  const handleSearch = () => {
    onSearch(query);
    setQuery("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
