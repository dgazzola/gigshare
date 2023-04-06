import React, { useState, useEffect } from "react"
import ArtistTile from "./ArtistTile.js"
import { Redirect } from "react-router-dom"
import GoogleMap from "./GoogleMap.js"
import GigFavoriteButton from "./GigFavoriteButton.js"
import EditGigButton from "./EditGigButton.js"


const GigShowPage = (props) => {
  const [gig, setGig] = useState({})
  const [artists, setArtists] = useState({})
  const [updatedGig,setUpdatedGig] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [dropDown, setDropDown] = useState("")
  const id = props.match.params.id

  const sortAlphabeticallyAscending = (a,b) => {
    if (a?.artistName.toLowerCase()<b?.artistName.toLowerCase()){
      return -1
    }
    if (a?.artistName.toLowerCase()>b?.artistName.toLowerCase()){
      return 1
    }
    return 0
  }

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
  const getArtists = async () => {
    try {
      const response = await fetch('/api/v1/artists')
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const parsedResponse = await response.json()
      setArtists(parsedResponse.artists)
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getGig(),
    getArtists(),
    initMap()
  }, [])

  let artistTileComponents=""
  let lineupMessage = <h1 className="glow small">Lineup TBA</h1>
  if (gig.artists?.length>0){
    lineupMessage = <h1 className="glow small">LineUp:</h1>
    artistTileComponents = gig.artists.sort( sortAlphabeticallyAscending ).map(artistObject => {
      return (
        <ArtistTile
          key={artistObject.id}
          {...artistObject}
        />
      )
    })
  }

  let favoriteCount
  const editGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${gig.id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(updatedGig)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body = await response.json()
        const returnedGig = body.gig 
        setShouldRedirect(true)      
        setGig(returnedGig)
      }
    } catch(err) {
    }
  }

  const handleInputChange = event => {
    setUpdatedGig({
      ...updatedGig,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleUpdate = event => {
    event.preventDefault()
    if (!updatedGig.name && !updatedGig.startTime && !updatedGig.endTime && !updatedGig.date && !updatedGig.city && !updatedGig.address && !updatedGig.state){
      handleEdit()
      alert(`No changes have been submitted for ${gig.name}!`)
    } else {
      editGig()
    }
  }

  let favoritedCountDisplay=""
  if (gig?.favorited?.length){
    favoriteCount = gig.favorited.length
    favoritedCountDisplay="Favorited:"
  }

  const handleFavoriteButton = async () =>{
    if (gig.isUserFavorite){
      try {
        const response = await fetch(`/api/v1/gigs/${id}/favorites`, {
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

  if (shouldRedirect){
    return <Redirect push to ={`/users/${props.currentUser.id}`} />
  }

  return (
    <div className="hero-image grid-x">
      <div className="bg-orange rounded small-5 scroll">
      <h1 className="glow small title-bold">{gig.name}</h1>
      <h2 className="text-white">{gig.city}, {gig.state}</h2>
      <h2 className="text-white">{gig.date}</h2>
      <h2 className="text-white">{gig.startTime}-{gig.endTime}</h2>
      <h2 className="text-white">{favoritedCountDisplay} {favoriteCount}</h2>
      <GoogleMap gig={gig} dropDown={dropDown}/>

      <GigFavoriteButton currentUser={props.currentUser} gig={gig} handleFavoriteButton={handleFavoriteButton} setGig={setGig}/>

      <EditGigButton handleInputChange={handleInputChange} currentUser={props.currentUser} gig={gig} handleUpdate={handleUpdate} updatedGig={updatedGig} artists={artists}/>
      </div>
      <div className="small-6 scroll">

      {lineupMessage}
      <div className="centered grid-x">
      {artistTileComponents}
      </div>

      </div>

    </div>
  )
}

export default GigShowPage