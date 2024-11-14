import React, { useState } from "react";
import EditGigForm from "./EditGigForm.js";

const EditGigButton = ({ 
  currentUser, gig, handleInputChange, handleUpdate, updatedGig, artists, 
  currentArtistPage, handleNextArtistPage, handlePreviousArtistPage, totalPages 
}) => {
  const [showGigForm, setShowGigForm] = useState(false);

  const handleEdit = () => {
    setShowGigForm(!showGigForm);
  };

  if (currentUser?.id === gig.hostId) {
    return (
      <div>
        <button type="button" className="button" onClick={handleEdit}>
          Edit
        </button>
        <EditGigForm 
          handleInputChange={handleInputChange} 
          currentUser={currentUser} 
          gig={gig} 
          handleUpdate={handleUpdate} 
          updatedGig={updatedGig} 
          showGigForm={showGigForm} 
          artists={artists} 
          currentArtistPage={currentArtistPage}
          handleNextArtistPage={handleNextArtistPage}
          handlePreviousArtistPage={handlePreviousArtistPage}
          totalPages={totalPages}
        />
      </div>
    );
  } else {
    return null;
  }
};

export default EditGigButton;