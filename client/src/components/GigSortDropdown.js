import React from "react"

const GigSortDropdown = ({setFilterFunction}) => {
  const handleChange = event => {
    event.preventDefault()
    setFilterFunction(event.currentTarget.value)
  }
  return (
    <>

      <label>
        <h2 className="centered">{`Filter By :`}</h2>
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