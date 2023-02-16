import React, { useState, useEffect } from "react"

const ArtistShowPage = (props) => {
  const [artist, setArtist] = useState({})
  console.log("props match params id = artist id", props.match)
  const id = props.match.params.id

  const getArtist = async() => {
    try {
      const response = await fetch(`/api/v1/artists/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const artistData = await response.json()
      setArtist(artistData.artist)
      console.log("ARTIST DATA", artistData)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getArtist()
  }, [])

  return(
    <div className="centered">
      {/* <div className="hero-image">
        <div className="hero-text"> */}
        <div className="text-box">
          <h1 className="huge opaque"> RETURN ARTIST TILE FORMATTED{artist.artistName}</h1>
          <h1 className="shift-down opaque">{artist.genre}</h1>
          <h1 className="shift-down opaque">Upcoming Gigs:</h1>

        </div>
      {/* </div>
    </div> */}
    </div>
  )
}

export default ArtistShowPage