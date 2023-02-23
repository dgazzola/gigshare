import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import GigTile from "./GigTile.js"
import ReactPlayer from "react-player"
import EditArtistForm from "./EditArtistForm.js"

const ArtistShowPage = (props) => {
  const [artist, setArtist] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const id = props.match.params.id
  const userId = props.currentUser?.id
  const [errors, setErrors] = useState({})

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
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    window.scrollTo(0,0),
    getArtist()
  }, [])
  
  const deleteArtist = async () => {
    try {
      const response = await fetch(`/api/v1/artists/${artist.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(artist)
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
      } else {
        setShouldRedirect(true)
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const editArtist = async (updatedArtist) => {
    try {
      const response = await fetch(`/api/v1/artists/${artist.id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(updatedArtist)
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
        const returnedArtist = body.artist    
        setShouldRedirect(true)      
        setArtist(returnedArtist)
      }
    } catch(err) {
    }
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${artist.artistName}'s profile? \nThis cannot be undone`) == true) {
      deleteArtist()
    } else {
      alert(`${artist.artistName}'s profile has NOT been deleted.`)
    }
  }

  let gigTileComponents = ""
  if (artist?.gigs) {
    gigTileComponents = artist.gigs.map(gigObject => {
      return (
          <GigTile
            key={gigObject.id}
            {...gigObject}
            currentUser={props.currentUser}
        />
      )
    })
  }

  if (shouldRedirect) {
    return <Redirect push to ={`/users/${userId}`} />
  }

  return(
    <div className="centered hero-image-2">
        <div className="text-box">
          <h1 className="glow huge">{artist.artistName}</h1>
          <h3 className="glow small">({artist.genre})</h3>
            <div className="player-wrapper">
              <ReactPlayer url={`${artist.mediaUrl}`} config={{
                soundcloud: {options: {auto_play: true}},
                youtube: {playerVars: { autoplay: 1 }}
              }}
              />
            </div>
          <h1 className="shift-down text-white glow small">Upcoming Gigs:</h1>
          <div className="grid-x">
            {gigTileComponents}
          </div>
          <EditArtistForm editArtist={editArtist} currentUser={props.currentUser} artist={artist} handleDelete={handleDelete}/>
        </div>
    </div>
  )
}

export default ArtistShowPage