import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"

const EditArtistForm = ({currentUser, artist, editArtist, handleDelete}) => {
  const [updatedArtist,setUpdatedArtist] = useState({})
  const [showEditForm, setShowEditForm] = useState(false)

  const handleEdit = () => {
    if (showEditForm){
      setShowEditForm(false)
    } else {
      setShowEditForm(true)
    }
    console.log(showEditForm)
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

  let editForm=""

  if (showEditForm){
    editForm =
    <div className="info-wrap">
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
        <input className="button" type="submit" value="Update Artist" />
        <button type="button" className="button" onClick={handleDelete}> Delete Artist</button>
    </form>

  </div>

  } else {
    editForm=""
  }

  if (currentUser?.id===artist.userId){
    return (
      <div>
        <button type="button" className="button" onClick={handleEdit}>
          Edit
        </button>
        {editForm}

      </div>
    )
  }
  else return (
    ""
  )
}

export default EditArtistForm