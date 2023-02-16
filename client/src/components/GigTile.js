import React from "react"
import { Link } from "react-router-dom"

const GigTile = ({ id, name, location, time}) => {
  const gigUrl = `/gigs/${id}`
  return(
    <button type="button" className="centered small-4">
    <div className=" callout centered tile-box">
      <Link to={gigUrl} className = "centered">
      <h4 className="black">{name}</h4>
      <p className="black">Location: {location}</p>
      <p className="black">Time: {time}</p>
      </Link>
    </div>

    </button>
  )
}

export default GigTile