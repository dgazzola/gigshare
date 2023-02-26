import React, { useState, useEffect } from "react"

const EditGigForm = ({ handleInputChange, currentUser, gig, handleUpdate, updatedGig, showGigForm}) => {

  if (currentUser?.id===gig.hostId && showGigForm){
    return(
      <div>
        {/* <button type="button" className="button" onClick={handleEdit}>
          Edit
        </button> */}
        <div className={`info-wrap`}>
          {/* <button type="button" className={`button`} onClick={toggleAddArtistDropdown}>
            Add Artist
          </button>
          {artistDropdown} */}
          <form onSubmit={handleUpdate} className="form-smaller">
            <label className="text-white">
                Update Gig Name:
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={updatedGig.name}
                />
            </label>
            <label className="text-white">
                Update Gig Date:
                <input
                  type="date"
                  name="date"
                  onChange={handleInputChange}
                  value={updatedGig.date}
                />
            </label>
            <label className="text-white">
                Update Gig Address:
                <input
                  type="text"
                  name="address"
                  onChange={handleInputChange}
                  value={updatedGig.address}
                />
            </label>
            <label className="text-white">
                Update Gig City:
                <input
                  type="text"
                  name="city"
                  onChange={handleInputChange}
                  value={updatedGig.city}
                />
            </label>
            <label className="text-white">
                Update Gig State:
                <input
                  type="text"
                  name="state"
                  onChange={handleInputChange}
                  value={updatedGig.state}
                />
            </label>
            <label className="text-white">
                Update Gig Start Time:
                <input
                  type="time"
                  name="startTime"
                  onChange={handleInputChange}
                  value={updatedGig.startTime}
                />
            </label>
            <label className="text-white">
                Update Gig End Time:
                <input
                  type="time"
                  name="endTime"
                  onChange={handleInputChange}
                  value={updatedGig.endTime}
                />
            </label>
          
            <div className="button-group centered">
              <input className="button" type="submit" value="Update Gig" />
            </div>
          </form>
        </div>
  
      </div>
    )
  } else {
    return null
  }
}

export default EditGigForm