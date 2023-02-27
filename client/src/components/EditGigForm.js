import React, { useState, useEffect } from "react"
import AddArtistToLineupButton from "./AddArtistToLineup"

const EditGigForm = ({ artists, handleInputChange, currentUser, gig, handleUpdate, updatedGig, showGigForm}) => {

  if (currentUser?.id===gig.hostId && showGigForm){
    return(
      <div>
        <AddArtistToLineupButton gig={gig} artists={artists}/>
        <div className={`info-wrap`}>
          <form onSubmit={handleUpdate}>
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
              <input className="button" type="submit" value="Update Gig" />
          </form>
        </div>
  
      </div>
    )
  } else {
    return null
  }
}

export default EditGigForm