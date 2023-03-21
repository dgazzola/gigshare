import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useEffect } from "react"

const SearchBar = ({gigs, setSearchResults}) => {
  const handleSubmit = event => {
    event.preventDefault()
  }
  const handleChange = event => {
    if (!event.target.value) {
      return setSearchResults([])
    } else {
      const resultsArray = gigs.filter(gig => gig.name.toLowerCase().includes(event.target.value.toLowerCase()) || gig.city.toLowerCase().includes(event.target.value.toLowerCase()))
        setSearchResults(resultsArray)
    }

  }

  return(
      <form className="search rounded" onSubmit={handleSubmit}>

        <h2 className="purple">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="black icon"/>
        Search:
        </h2>

        <input
          className="search__input"
          placeholder={`Search for a gig by name, or city:`}
          type="text"
          id="search"
          onChange={handleChange}
        /> 
      </form>


  )
}

export default SearchBar