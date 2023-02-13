import React from "react"
import { Link } from "react-router-dom"

const GigTile = ({ id, name, location, time}) => {
  const gigUrl = `/gigs/${id}`
  return(
    <div className="small-6 callout centered">
      <Link to={gigUrl} className = "centered">
      <h4>{name}</h4>
      <p>Location: {location}</p>
      <p>Time: {time}</p>
      </Link>
    </div>
  )
}

export default GigTile