// import React from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faListUl } from "@fortawesome/free-solid-svg-icons";

// const GigSortDropdown = ({setFilterFunction}) => {
//   const handleChange = event => {
//     event.preventDefault()
//     setFilterFunction(event.currentTarget.value)
//   }
//   return (
//     <>

//       <label>
      
//         <h2 className="centered"><FontAwesomeIcon icon={faListUl} />{` Filter`}</h2>
//       </label>
//       <select id="gigs" onChange={handleChange}>
//         <option value=""></option>
//         <option value="alphabeticallyAscending">{`Alphabetically (A-Z)`}</option>
//         <option value="alphabeticallyDescending">{`Alphabetically (Z-A)`}</option>
//         <option value="chronologicallyClosest">{`Chronologically (Closest)`} </option>
//         <option value="chronologicallyFurthest">{`Chronologically (Furthest)`}</option>
//       </select>
//     </>
//   )
// }

// export default GigSortDropdown

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

const GigSortDropdown = ({ setFilterFunction }) => {
  // Map dropdown values to sorting functions
  const sortFunctions = {
    alphabeticallyAscending: (a, b) => a.name.localeCompare(b.name),
    alphabeticallyDescending: (a, b) => b.name.localeCompare(a.name),
    chronologicallyClosest: (a, b) => new Date(a.date) - new Date(b.date),
    chronologicallyFurthest: (a, b) => new Date(b.date) - new Date(a.date),
  };

  const handleChange = (event) => {
    event.preventDefault();
    const selectedFunction = sortFunctions[event.currentTarget.value] || null; // Map value to function or fallback to null
    setFilterFunction(selectedFunction);
  };

  return (
    <>
      <label>
        <h2 className="centered">
          <FontAwesomeIcon icon={faListUl} />
          {` Filter`}
        </h2>
      </label>
      <select id="gigs" onChange={handleChange}>
        <option value="">{`Default (Created At)`}</option>
        <option value="alphabeticallyAscending">{`Alphabetically (A-Z)`}</option>
        <option value="alphabeticallyDescending">{`Alphabetically (Z-A)`}</option>
        <option value="chronologicallyClosest">{`Chronologically (Closest)`}</option>
        <option value="chronologicallyFurthest">{`Chronologically (Furthest)`}</option>
      </select>
    </>
  );
};

export default GigSortDropdown;
