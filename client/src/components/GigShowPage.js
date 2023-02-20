import React, { useState, useEffect } from "react"
import ArtistTile from "./ArtistTile.js"
import { Redirect } from "react-router-dom"

const GigShowPage = (props) => {
  const [gig, setGig] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
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

  let favoriteMessage

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

  let favoriteCount
  if (gig?.favorited?.length){
    favoriteCount = gig.favorited.length
  }

  if (gig.isUserFavorite) {
    favoriteMessage = "Unfavorite"
  } else {
    favoriteMessage = "Favorite"
  }

  const handleFavoriteButton = async () =>{
    if (gig.isUserFavorite){
      try {
        const response = await fetch(`/api/v1/gigs/${gig.id}/favorites`, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(gig)
        })
        if (!response.ok) {
          if (response.status===422) {
            const body = await response.json()
            const newErrors = translateServerErrors(body.errors)
            return setErrors(newErrors)
          } else {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw error         
          }
        }
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
    if (!gig.isUserFavorite){
      try {
        const response = await fetch(`/api/v1/gigs/${gig.id}/favorites`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(gig)
        })
        if (!response.ok) {
          if (response.status===422) {
            const body = await response.json()
            const newErrors = translateServerErrors(body.errors)
            return setErrors(newErrors)
          } else {
            const errorMessage = `${response.status} (${response.statusText})`
            const error = new Error(errorMessage)
            throw error         
          }
        }
      } catch(err) {
        console.error(`Error in fetch: ${err.message}`)
      }
    }
    getGig()
  }

  return (
    <div className="centered text-white">
      <div className="hero-image">
      <h1 className="glow small shift-down-small">{gig.name}</h1>
      <h2 className="text-white">Location: {gig.location}</h2>
      <h2 className="text-white">Date: {gig.date}</h2>
      <h2 className="text-white">Time: {gig.time}</h2>
      <h2 className="text-white">Favorited: {favoriteCount}</h2>
      <button type="button" className="button" onClick={handleFavoriteButton}>{favoriteMessage}</button>
      {lineupMessage}
      {artistTileComponents}
      <h2 className="text-white">Register an artist if you're owner of gig</h2>
      </div>
    </div>
  )
}

export default GigShowPage