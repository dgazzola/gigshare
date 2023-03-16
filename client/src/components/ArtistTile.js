import React from "react"
import { Link } from "react-router-dom"

const ArtistTile = ({ id, artistName, genre}) => {
  const artistUrl = `/artists/${id}`
  return(

    <div className="button callout tile-box centered cell small-3 bg-orange">
      <Link to={artistUrl} className = "centered">
      <h4 className="black">{artistName}</h4>
      <p className="black">{genre}</p>
      </Link>
    </div>

  )
}

export default ArtistTile