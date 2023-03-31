import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faListUl } from "@fortawesome/free-solid-svg-icons";

const GigSortDropdown = ({setFilterFunction}) => {
  const handleChange = event => {
    event.preventDefault()
    setFilterFunction(event.currentTarget.value)
  }
  return (
    <>

      <label>
      
        <h2 className="centered"><FontAwesomeIcon icon={faListUl} />{` Filter`}</h2>
      </label>
      <select id="gigs" onChange={handleChange}>
        <option value=""></option>
        <option value="alphabeticallyAscending">{`Alphabetically (A-Z)`}</option>
        <option value="alphabeticallyDescending">{`Alphabetically (Z-A)`}</option>
        <option value="chronologicallyClosest">{`Chronologically (Closest)`} </option>
        <option value="chronologicallyFurthest">{`Chronologically (Furthest)`}</option>
      </select>
    </>
  )
}

export default GigSortDropdown