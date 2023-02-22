import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import GigTile from "./GigTile.js"
import ReactPlayer from "react-player"

const ArtistShowPage = (props) => {
  const [artist, setArtist] = useState({})
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [updatedArtist,setUpdatedArtist] = useState({})
  const id = props.match.params.id
  const userId = props.currentUser?.id
  const [errors, setErrors] = useState({})
  const [visibility, setVisibility] = useState("invisible")

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

  let editArtistForm=''
  let deleteArtistButton=''

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

  const editArtist = async () => {
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

  const handleUpdate = event => {
    event.preventDefault()
    if (!updatedArtist.artistName && !updatedArtist.genre && !updatedArtist?.mediaUrl){
      handleEdit()
      alert(`No changes have been submitted for ${artist.artistName}'s profile!`)
    } else {
      editArtist()
    }
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${artist.artistName}'s profile? \nThis cannot be undone`) == true) {
      deleteArtist()
    } else {
      alert(`${artist.artistName}'s profile has NOT been deleted.`)
    }
  }

  const handleEdit = () => {
    if (visibility){
      setVisibility("")
    } else {
      setVisibility("invisible")
      window.scrollTo(0,0)
    }
  }

  const handleInputChange = event => {
    setUpdatedArtist({
      ...updatedArtist,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  
  if (props.currentUser?.id===artist.userId){
    editArtistForm =<div>
      <button type="button" className="button shift-down" onClick={handleEdit}>
        Edit
      </button>
    <div className={`${visibility}`}>
      <form onSubmit={handleUpdate} className="form-smaller">
      <label className="text-white">
          Update Artist Name:
          <input
            type="text"
            name="artistName"
            onChange={handleInputChange}
            value={updatedArtist.artistName}
          />
        </label>
      <label className="text-white">
          Update Genre:
          <input
            type="text"
            name="genre"
            onChange={handleInputChange}
            value={updatedArtist.genre}
          />
        </label>
      <label className="text-white">
          Update Profile Song:
          <input
            type="text"
            name="mediaUrl"
            onChange={handleInputChange}
            value={updatedArtist.mediaUrl}
          />
        </label>
        <div className="button-group centered">
          <input className="button" type="submit" value="Submit Artist Update" />
        </div>
      </form>
    </div>

    </div>
    deleteArtistButton=<button type="button" className={`button shift-down ${visibility}`} onClick={handleDelete}> Delete Artist</button>
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
          {editArtistForm}
          <br className="shift-down-big"></br>
          {deleteArtistButton}
        </div>
    </div>
  )
}

export default ArtistShowPage