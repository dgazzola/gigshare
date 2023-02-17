import React from "react"
import { Link } from "react-router-dom"

const ArtistTile = ({ id, artistName, genre}) => {
  const artistUrl = `/artists/${id}`
  console.log("id", id)
  console.log("artistName", artistName)
  console.log("genre", genre)
  return(
    <button type="button" className="centered small-4">
    <div className=" callout centered tile-box">
      <Link to={artistUrl} className = "centered">
      <h4 className="black">{artistName}</h4>
      <p className="black">{genre}</p>
      </Link>
    </div>

    </button>
  )
}

export default ArtistTile