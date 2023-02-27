import React, { useState, useEffect } from "react"
import EditGigForm from "./EditGigForm.js"

const EditGigButton = ({ currentUser, gig, handleInputChange, handleUpdate, updatedGig, artists }) => {
  const [showGigForm, setShowGigForm] = useState(false)

  const handleEdit = () => {
    if (showGigForm) {
      setShowGigForm(false)
    } else {
      setShowGigForm(true)
    }
    console.log(showGigForm)
  }

  if (currentUser?.id===gig.hostId){
    return(
      <div>
        <button type="button" className="button" onClick={handleEdit}>
              Edit
        </button>
        <EditGigForm handleInputChange={handleInputChange} currentUser={currentUser} gig={gig} handleUpdate={handleUpdate} updatedGig={updatedGig} showGigForm={showGigForm} artists={artists}/>
      </div>
    )
  } else {
    return null
  }
}

export default EditGigButton