import React from "react"
import { Link } from "react-router-dom"

const ArtistTile = ({ id, artistName, genre, gig, setGig}) => {
  const artistUrl = `/artists/${id}`
  console.log('artist tile id and gig:', id, gig)
  // needs minus button to remove from gig list
  return(

    <div className="button callout tile-box centered cell small-3 bg-orange">
      <Link to={artistUrl} className = "centered">
      <h4 className="title-bold">{artistName}</h4>
      <p className="descriptor">{genre}</p>
      </Link>
    </div>

  )
}

export default ArtistTile