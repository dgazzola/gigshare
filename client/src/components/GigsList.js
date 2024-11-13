import React, { useState, useEffect } from "react";
import GigTile from "./GigTile.js";
import SearchBar from "../services/SearchBar.js";
import GigSortDropdown from "./GigSortDropdown.js";
import ToggleGroup from "./ToggleGroup.js";

const GigsListPage = (props) => {
  const [gigs, setGigs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterFunction, setFilterFunction] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("allGigs");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // New state for storing search query

  // Sorting Functions
  const sortAlphabeticallyAscending = (a, b) => {
    if (a?.name.toLowerCase() < b?.name.toLowerCase()) return -1;
    if (a?.name.toLowerCase() > b?.name.toLowerCase()) return 1;
    return 0;
  };

  const sortAlphabeticallyDescending = (a, b) => {
    if (a?.name.toLowerCase() > b?.name.toLowerCase()) return -1;
    if (a?.name.toLowerCase() < b?.name.toLowerCase()) return 1;
    return 0;
  };

  const createdAt = (a, b) => {
    if (a?.createdAt > b?.createdAt) return -1;
    if (a?.createdAt < b?.createdAt) return 1;
    return 0;
  };

  const sortChronologicallyClosest = (a, b) => {
    const dateA = new Date(`${a?.date[6] + a?.date[7] + a?.date[8] + a?.date[9]}-${a?.date[0] + a?.date[1]}-${a?.date[3] + a?.date[4]}`);
    const dateB = new Date(`${b?.date[6] + b?.date[7] + b?.date[8] + b?.date[9]}-${b?.date[0] + b?.date[1]}-${b?.date[3] + b?.date[4]}`);
    if (dateA > dateB) return 1;
    if (dateA < dateB) return -1;
    return 0;
  };

  const sortChronologicallyFurthest = (a, b) => {
    const dateA = new Date(`${a?.date[6] + a?.date[7] + a?.date[8] + a?.date[9]}-${a?.date[0] + a?.date[1]}-${a?.date[3] + a?.date[4]}`);
    const dateB = new Date(`${b?.date[6] + b?.date[7] + b?.date[8] + b?.date[9]}-${b?.date[0] + b?.date[1]}-${b?.date[3] + b?.date[4]}`);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  };

  // Fetch gigs with pagination
  const getGigs = async (page) => {
    try {
      const response = await fetch(`/api/v1/gigs?page=${page}&limit=8`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const parsedResponse = await response.json();
      setGigs(parsedResponse.gigs);
      setTotalPages(parsedResponse.totalPages);
      setCurrentPage(parsedResponse.currentPage);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const searchGigs = async (query, page) => {
    try {
      const response = await fetch(`/api/v1/gigs/search?query=${query}&page=${page}&limit=8`);
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`);
      }
      const parsedResponse = await response.json();
      setSearchResults(parsedResponse.gigs);
      setSearchTotalPages(parsedResponse.totalPages);
      setSearchPage(parsedResponse.currentPage);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    if (selectedComponent === "allGigs") {
      getGigs(currentPage);
    }
  }, [currentPage, selectedComponent]);

  useEffect(() => {
    if (selectedComponent === "searchGigs") {
      searchGigs(searchQuery, searchPage);
    }
  }, [searchPage, searchQuery, selectedComponent]);

  const handleNextPage = () => {
    if (selectedComponent === "allGigs" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (selectedComponent === "searchGigs" && searchPage < searchTotalPages) {
      setSearchPage(searchPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (selectedComponent === "allGigs" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (selectedComponent === "searchGigs" && searchPage > 1) {
      setSearchPage(searchPage - 1);
    }
  };

  let sortedTileComponents;
  if (!filterFunction) {
    const sortedGigs = gigs.sort(createdAt);
    sortedTileComponents = sortedGigs.map((gigObject) => (
      <GigTile key={gigObject.id} {...gigObject} currentUser={props.currentUser} />
    ));
  }

  const searchTileComponents = searchResults.map((gigObject) => (
    <GigTile key={gigObject.id} {...gigObject} currentUser={props.currentUser} />
  ));

  return (
    <div className="hero-image bg-clear">
      <div className="small-2 bg-clear scroll" style={{ flexDirection: 'column', alignItems: 'center' }}>
        <ToggleGroup setSelectedComponent={setSelectedComponent} selectedComponent={selectedComponent} />

        {selectedComponent === "allGigs" && (
          <div style={{ maxWidth: '70%', margin: '0 auto' }}>
            <GigSortDropdown gigs={gigs} setGigs={setGigs} setFilterFunction={setFilterFunction} />
            <div className="grid-x grid-padding-x" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {sortedTileComponents}
            </div>
            <div className="pagination-controls">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        )}

        {selectedComponent === "searchGigs" && (
          <div style={{ maxWidth: '70%', margin: '0 auto' }}>
            <SearchBar 
              setSearchQuery={setSearchQuery} // Pass setSearchQuery for updating search query
              searchGigs={searchGigs} 
              setSearchPage={setSearchPage} 
            />
            <div className="grid-x grid-padding-x" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {searchTileComponents}
            </div>
            <div className="pagination-controls">
              <button onClick={handlePreviousPage} disabled={searchPage === 1}>Previous</button>
              <span>Page {searchPage} of {searchTotalPages}</span>
              <button onClick={handleNextPage} disabled={searchPage === searchTotalPages}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigsListPage;
