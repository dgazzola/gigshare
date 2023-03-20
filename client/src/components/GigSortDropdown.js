import React from "react"

const GigSortDropdown = ({setFilterFunction}) => {
  const handleChange = event => {
    event.preventDefault()
    setFilterFunction(event.currentTarget.value)
  }
  return (
    <>

      <label>
        <h1 className="centered">{`Filter By :`}</h1>
      </label>
      <select id="gigs" onChange={handleChange}>
        <option value=""></option>
        <option value="alphabeticallyAscending">{`Alphabetically (a-z)`}</option>
        <option value="alphabeticallyDescending">{`Alphabetically (z-a)`}</option>
        <option value="chronologicallyClosest">{`Chronologically (closest first)`} </option>
        <option value="chronologicallyFurthest">{`Chronologically (furthest first)`}</option>
      </select>
    </>
  )
}

export default GigSortDropdown