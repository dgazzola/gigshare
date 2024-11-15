import React, { useState, useEffect } from "react";
import ArtistTile from "./ArtistTile.js";
import { Redirect } from "react-router-dom";
import GoogleMap from "./GoogleMap.js";
import GigFavoriteButton from "./GigFavoriteButton.js";
import EditGigButton from "./EditGigButton.js";
import getCurrentUser from "../services/getCurrentUser.js";

const GigShowPage = (props) => {
  const [gig, setGig] = useState({});
  const [updatedGig, setUpdatedGig] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [currentArtistPage, setCurrentArtistPage] = useState(1);
  const id = props.match.params.id;
  const artistsPerPage = 8;

  const indexOfLastArtist = currentArtistPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = gig.artists?.slice(indexOfFirstArtist, indexOfLastArtist);
  const totalArtistPages = Math.ceil((gig.artists?.length || 0) / artistsPerPage);

  const getGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      const gigData = await response.json();
      setGig(gigData.gig);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getGig();
  }, []);

  const handleNextArtistPage = () => {
    if (currentArtistPage < totalArtistPages) {
      setCurrentArtistPage(currentArtistPage + 1);
    }
  };

  const handlePreviousArtistPage = () => {
    if (currentArtistPage > 1) {
      setCurrentArtistPage(currentArtistPage - 1);
    }
  };

  const handleInputChange = (event) => {
    setUpdatedGig({
      ...updatedGig,
      [event.currentTarget.name]: event.currentTarget.value
    });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    editGig();
  };

  const editGig = async () => {
    try {
      const response = await fetch(`/api/v1/gigs/${gig.id}`, {
        method: "PATCH",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(updatedGig)
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        throw new Error(errorMessage);
      }
      const body = await response.json();
      setShouldRedirect(true);
      setGig(body.gig);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  if (shouldRedirect) {
    return <Redirect push to={`/users/${props.currentUser.id}`} />;
  }

  let lineupMessage = <h1 className="glow small">Lineup TBA</h1>;
  let artistTileComponents = "";
  if (gig.artists && gig.artists.length > 0) {
    lineupMessage = <h1 className="glow small title-bold">LineUp:</h1>;
    artistTileComponents = currentArtists.map((artistObject) => (
      <ArtistTile key={artistObject.id} {...artistObject} />
    ));
  }

  return (
    <div className="hero-image grid-x">
      <div className="bg-orange rounded small-5 scroll" style={{ position: "relative" }}>
  <div className="favorite-button-container">
    <GigFavoriteButton gigId={gig.id} currentUser={props.currentUser} />
  </div>
  <h1 className="glow small title-bold" style={{ marginLeft: "40px", display: "inline-block" }}>
    {gig.name}
  </h1>
  <h2 className="text-white">{gig.city}, {gig.state}</h2>
  <h2 className="text-white">{gig.date}</h2>
  <h2 className="text-white">{gig.startTime}-{gig.endTime}</h2>
  <GoogleMap gig={gig} />
  <EditGigButton 
    handleInputChange={handleInputChange} 
    currentUser={props.currentUser} 
    gig={gig} 
    handleUpdate={handleUpdate} 
    updatedGig={updatedGig} 
    artists={gig.artists}
  />
</div>

      <div className="small-6 scroll">
        {lineupMessage}
        <div className="centered grid-x">{artistTileComponents}</div>
        {totalArtistPages > 1 && (
          <div className="pagination-controls">
            <button
              className="pagination-button"
              onClick={handlePreviousArtistPage}
              disabled={currentArtistPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentArtistPage} of {totalArtistPages}
            </span>
            <button
              className="pagination-button"
              onClick={handleNextArtistPage}
              disabled={currentArtistPage === totalArtistPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigShowPage;