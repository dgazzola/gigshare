import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

const SearchBar = ({ setSearchQuery, searchGigs, setSearchPage }) => {
  const [query, setQuery] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setSearchPage(1);

    if (debounceTimer) clearTimeout(debounceTimer);
    const newTimer = setTimeout(() => {
      setSearchQuery(newQuery);
      searchGigs(newQuery, 1);
    }, 500);
    setDebounceTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [debounceTimer]);

  return (
    <form className="search rounded" onSubmit={(e) => e.preventDefault()}>
      <h2 className="purple">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="black icon" />
        {` Search`}
      </h2>
      <input
        className="search__input"
        placeholder="Search for a gig by name, or city:"
        type="text"
        value={query}
        onChange={handleChange}
      />
    </form>
  );
};

export default SearchBar;