import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"

const EditArtistForm = ({currentUser, artist, editArtist, handleDelete}) => {
  const [updatedArtist,setUpdatedArtist] = useState({})
  const [visibility, setVisibility] = useState("invisible")

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

  const handleUpdate = event => {
    event.preventDefault()
    if (!updatedArtist.artistName && !updatedArtist.genre && !updatedArtist?.mediaUrl){
      handleEdit()
      alert(`No changes have been submitted for ${artist.artistName}'s profile!`)
    } else {
      editArtist(updatedArtist)
    }
  }


  if (currentUser?.id===artist.userId){
    return (
      <div>
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
      <button type="button" className={`button shift-down ${visibility}`} onClick={handleDelete}> Delete Artist</button>
      </div>
    )
  }
  else return (
    ""
  )
}

export default EditArtistForm