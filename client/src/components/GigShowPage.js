import React, { useState, useEffect } from "react"
import ArtistTile from "./ArtistTile.js"

const GigShowPage = (props) => {
  const [gig, setGig] = useState({})
  const id = props.match.params.id

  const getGig = async() => {
    try {
      const response = await fetch(`/api/v1/gigs/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const gigData = await response.json()
      setGig(gigData.gig)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getGig()
  }, [])
  let artistTileComponents=""
  let lineupMessage = <h1 className="glow small shift-down-small">Lineup TBA</h1>
  if (gig.artists?.length>0){
    lineupMessage = <h1 className="glow small shift-down-small">LineUp:</h1>
    artistTileComponents = gig.artists.map(artistObject => {
      return (
        <ArtistTile
          key={artistObject.id}
          {...artistObject}
        />
      )
    })
  }


  return (
    <div className="centered text-white">
      <div className="hero-image">
      <h1 className="glow small shift-down-small">{gig.name}</h1>
      <h2 className="text-white">Location: {gig.location}</h2>
      <h2 className="text-white">Date: {gig.date}</h2>
      <h2 className="text-white">Time: {gig.time}</h2>
      {lineupMessage}
      {artistTileComponents}
      <h2 className="text-white">Register an artist if you're owner of gig</h2>
      </div>
    </div>
  )

}

export default GigShowPage