import React, { useState, useEffect } from "react";
import GigTile from "./GigTile.js";
import SearchBar from "../services/SearchBar.js";
import ToggleGroup from "./ToggleGroup.js";
import '../assets/scss/main.scss';

const GigsListPage = (props) => {
  const [gigs, setGigs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filterFunction, setFilterFunction] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState("allGigs");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchPage, setSearchPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const createdAt = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
  const getGigs = async (page) => {
    try {
      const response = await fetch(`/api/v1/gigs?page=${page}&limit=8`);
      if (!response.ok) throw new Error(`${response.status} (${response.statusText})`);
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
      if (!response.ok) throw new Error(`${response.status} (${response.statusText})`);
      const parsedResponse = await response.json();
      setSearchResults(parsedResponse.gigs);
      setSearchTotalPages(parsedResponse.totalPages);
      setSearchPage(parsedResponse.currentPage);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    if (selectedComponent === "allGigs") getGigs(currentPage);
  }, [currentPage, selectedComponent]);

  useEffect(() => {
    if (selectedComponent === "searchGigs") searchGigs(searchQuery, searchPage);
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

  const sortedGigs = filterFunction
    ? gigs.slice().sort(filterFunction)
    : gigs.slice().sort(createdAt);

  const sortedSearchResults = filterFunction
    ? searchResults.slice().sort(filterFunction)
    : searchResults;

  const gigComponents = sortedGigs.map((gig) => (
    <GigTile key={gig.id} {...gig} currentUser={props.currentUser} />
  ));

  const searchComponents = sortedSearchResults.map((gig) => (
    <GigTile key={gig.id} {...gig} currentUser={props.currentUser} />
  ));

  return (
    <div className="hero-image bg-clear">
      <div className="small-2 bg-clear scroll" style={{ flexDirection: 'column', alignItems: 'center' }}>
        <ToggleGroup setSelectedComponent={setSelectedComponent} selectedComponent={selectedComponent} />
  
        {selectedComponent === "allGigs" && (
          <div style={{ maxWidth: '70%', margin: '0 auto' }}>
            <div className="grid-x grid-padding-x" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {gigComponents}
            </div>
            {gigs.length > 0 && (
              <div className="pagination-controls">
                <button className="pagination-button" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span className="pagination-info">Page {currentPage} of {totalPages}</span>
                <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
              </div>
            )}
          </div>
        )}
  
        {selectedComponent === "searchGigs" && (
          <div style={{ maxWidth: '70%', margin: '0 auto' }}>
            <SearchBar 
              setSearchQuery={setSearchQuery} 
              searchGigs={searchGigs} 
              setSearchPage={setSearchPage} 
            />
            <div className="grid-x grid-padding-x" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {searchResults.length > 0 ? searchComponents : <p>No results found</p>}
            </div>
            {searchResults.length > 0 && (
              <div className="pagination-controls">
                <button className="pagination-button" onClick={handlePreviousPage} disabled={searchPage === 1}>Previous</button>
                <span className="pagination-info">Page {searchPage} of {searchTotalPages}</span>
                <button className="pagination-button" onClick={handleNextPage} disabled={searchPage === searchTotalPages}>Next</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GigsListPage;
